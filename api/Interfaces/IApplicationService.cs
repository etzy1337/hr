namespace api.Interfaces
{
	public interface IApplicationService
	{
		Task<GetApplicationDto> CreateApplicationAsync(AddApplicationDto dto);
		Task<IEnumerable<GetGroupedApplicationsDto>> GetGroupedApplicationsAsync();
		Task<GetApplicationDto> GetApplicationAsync(Guid id);
		Task<IEnumerable<GetApplicationDto>> GetUserApplications();
	}
}
