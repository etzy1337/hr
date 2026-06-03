
namespace api.Repositories
{
	public class CvRepository (ApplicationDBContext context)
		: ICvRepository
	{
		public async Task<CV> AddAsync(CV model)
		{
			await context.CVs.AddAsync(model);
			await context.SaveChangesAsync();
			return model;
		}

		public async Task<CV> GetByIdAsync(int id)
		{
			var result = await context.CVs.FindAsync(id);
			if (result == null)
				throw new NotFoundException("CV does not exist");
			return result;
		}
	}
}
