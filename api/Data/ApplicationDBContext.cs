using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace api.Data
{
	public class ApplicationDBContext : IdentityDbContext<AppUser>
	{
		public ApplicationDBContext(DbContextOptions<ApplicationDBContext> dbContextOptions)
			:base(dbContextOptions)
		{
			
		}
		public DbSet<JobOffer> JobOffers { get; set; }
		public DbSet<Application> Applications { get; set; }
		public DbSet<CV> CVs { get; set; }


		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			builder.Entity<JobOffer>().HasData(
				 new JobOffer
				 {
					 Id = 1,
					 JobTitle = "Backend .NET Developer",
					 Salary = 12000,
					 Description = "Work with ASP.NET Core, EF Core and PostgreSQL"
				 },
				new JobOffer
				{
					Id = 2,
					JobTitle = "Frontend React Developer",
					Salary = 10000,
					Description = "Build UI using React and TypeScript"
				},
				new JobOffer
				{
					Id = 3,
					JobTitle = "Fullstack Developer",
					Salary = 15000,
					Description = "Work across backend and frontend systems"
				});


			List<IdentityRole> roles = new List<IdentityRole>
				{
					new IdentityRole
					{
						Id="Admin",
						Name="Admin",
						NormalizedName="ADMIN"
					},
					new IdentityRole
					{
						Id="User",
						Name="User",
						NormalizedName="USER"
					},
					new IdentityRole
					{
						Id="Examiner",
						Name="Examiner",
						NormalizedName="EXAMINER"
					}
				};
			builder.Entity<IdentityRole>().HasData(roles);
		}

	}
}
