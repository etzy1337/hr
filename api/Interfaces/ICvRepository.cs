namespace api.Interfaces
{
	public interface ICvRepository
	{
		Task<CV> AddAsync(CV model);
		Task<CV> GetByIdAsync(int id);
	}
}
