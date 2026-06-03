using api.Dtos.Application;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
	public class ApplicationRepository (ApplicationDBContext context)
		: IApplicationRepository
	{
		public async Task<bool> AcceptApplicationAsync(Guid id)
		{
			var application = await context.Applications.FindAsync(id);
			if (application == null)
				throw new NotFoundException("Application not found");

			application.Status = "Accepted";
			await context.SaveChangesAsync();

			return true;
		}

		public async Task<Application> AddAsync(Application model)
		{
			await context.AddAsync(model);
			await context.SaveChangesAsync();
			return model;
		}

		public async Task<bool> ApplicationExistAsync(int jobOfferId, string userId)
		{
			return await context.Applications.AnyAsync(x => x.JobOfferId == jobOfferId && x.AppUserId == userId);
		}

		public async Task<IEnumerable<Application>> GetAllAsync()
		{
			return await context.Applications.Include(x=>x.JobOffer).Include(x=>x.AppUser).Include(x=>x.CV).ToListAsync();
		}

		public async Task<IEnumerable<Application>> GetApplicationsByUserIdAsync(string userId)
		{
			return await context.Applications.Include(x => x.JobOffer).Include(x => x.CV).Include(x => x.AppUser).Where(x => x.AppUserId == userId).ToListAsync();
		}

		public async Task<Application> GetByIdAsync(Guid id)
		{
			var application = await context.Applications.Include(x => x.JobOffer).Include(x => x.CV).Include(x=>x.AppUser).FirstOrDefaultAsync(x => x.Id == id);
			if (application == null)
				throw new NotFoundException("Application not found");
			return application;
		}

		public async Task<bool> RejectApplicationAsync(Guid id)
		{
			var application = await context.Applications.FindAsync(id);
			if (application == null)
				throw new NotFoundException("Application not found");

			application.Status = "Rejected";
			await context.SaveChangesAsync();

			return true;
		}

		public async Task<Application> UpdateAsync(Application model)
		{
			context.Applications.Update(model);
			await context.SaveChangesAsync();
			return model;
		}
	}
}
