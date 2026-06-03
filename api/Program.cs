using api.Data;
using api.Exceptions.Handler;
using api.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDBContext>(opts =>
{
	opts.UseNpgsql(builder.Configuration.GetConnectionString("Database"));
});

builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
{
	options.Password.RequireDigit = true;
	options.Password.RequiredLength = 8;
	options.Password.RequireNonAlphanumeric = false;
	options.Password.RequireLowercase = true;
	options.Password.RequireUppercase = true;
})
.AddDefaultTokenProviders()
.AddEntityFrameworkStores<ApplicationDBContext>();

builder.Services.AddAuthentication(options => {
	options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
	options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
	.AddJwtBearer(options =>
	{
		options.TokenValidationParameters = new TokenValidationParameters
		{
			ValidateIssuer = true,
			ValidateAudience = true,
			ValidateLifetime = true,
			ValidateIssuerSigningKey = true,

			ValidIssuer = builder.Configuration["JWT:Issuer"],
			ValidAudience = builder.Configuration["JWT:Audience"],
			IssuerSigningKey = new SymmetricSecurityKey(
				Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"]!)
				),
			NameClaimType = "nameid"
		};
		options.Events = new JwtBearerEvents
		{
			OnMessageReceived = context =>
			{
				context.Token = context.Request.Cookies["jwt"];
				return Task.CompletedTask;
			}
		};
	});

builder.Services.AddCors(options =>
{
	options.AddPolicy("cors", policy =>
	{
		policy
			.WithOrigins("https://localhost:7096","http://localhost:5173")
			.AllowAnyHeader()
			.AllowAnyMethod()
			.AllowCredentials();
	});
});

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

builder.Services.AddScoped<IJobOfferRepository, JobOfferRepository>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IApplicationService, ApplicationService>();
builder.Services.AddScoped<IApplicationRepository, ApplicationRepository>();
builder.Services.AddScoped<ICvRepository, CvRepository>();
builder.Services.AddScoped<IOcrService, OcrService>();
builder.Services.AddScoped<IOllamaService,OllamaService>();
builder.Services.AddScoped<CurrentUserService>();
builder.Services.AddSingleton<IQueueService,QueueService>();
builder.Services.AddHostedService<ApplicationBackgroundService>();

builder.Services.AddHttpClient();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// Configure the HTTP request pipeline.
app.UseExceptionHandler(opts => { });


app.UseHttpsRedirection();

app.UseCors("cors");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseMigration();


app.Run();
