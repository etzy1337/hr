namespace api.Interfaces
{
	public interface IJobOfferRepository
	{
		Task<IEnumerable<JobOffer>> GetAllAsync();
		Task<JobOffer> GetByIdAsync(int id);
		Task<JobOffer>AddJobOfferAsync(JobOffer jobOffer);
		Task<bool>RemoveAsync(int id);
	}
}
