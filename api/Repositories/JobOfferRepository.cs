using api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
	public class JobOfferRepository(ApplicationDBContext context)
		: IJobOfferRepository
	{
		public async Task<JobOffer> AddJobOfferAsync(JobOffer jobOffer)
		{
			await context.JobOffers.AddAsync(jobOffer);
			await context.SaveChangesAsync();
			return jobOffer;
		}

		public async Task<IEnumerable<JobOffer>> GetAllAsync()
		{
			var JobOffers = await context.JobOffers.ToListAsync();
	
			return JobOffers;
		}

		public async Task<JobOffer> GetByIdAsync(int id)
		{
			var jobOffer = await context.JobOffers.FindAsync(id);

			if (jobOffer is null)
				throw new NotFoundException("Job offer not found");
			return jobOffer;
		}

		public async Task<bool> RemoveAsync(int id)
		{
			var jobOffer = await context.JobOffers.FindAsync(id);
			if (jobOffer is null)
				throw new NotFoundException("Job offer not found");
			return true;

		}
	}
}
