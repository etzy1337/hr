using api.Dtos.Application;

namespace api.Interfaces
{
	public interface IApplicationRepository
	{
		Task<Application> AddAsync(Application model);
		Task<Application> GetByIdAsync(Guid id);
		Task<Application> UpdateAsync(Application model);
		Task<IEnumerable<Application>>GetApplicationsByUserIdAsync(string userId);
		Task<bool> ApplicationExistAsync(int jobOfferId, string userId);
		Task<IEnumerable<Application>> GetAllAsync();
		Task<bool> AcceptApplicationAsync(Guid id);
		Task<bool> RejectApplicationAsync(Guid id);
	}
}
