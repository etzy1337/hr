using Microsoft.EntityFrameworkCore;

namespace api.Data
{
	public static class Extensions
	{
		public static IApplicationBuilder UseMigration(this IApplicationBuilder app)
		{
			using var scope = app.ApplicationServices.CreateScope();
			using var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDBContext>();
			dbContext.Database.Migrate();

			return app;
		}
	}
}
