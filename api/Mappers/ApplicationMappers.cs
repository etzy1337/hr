using System.Runtime.CompilerServices;

namespace api.Mappers
{
	public static class ApplicationMappers
	{
		public static GetApplicationDto toGetApplicationDto(this Application model)
		{
			return new GetApplicationDto
			{
				Id= model.Id,
				Name = model.AppUser.Name,
				Surname = model.AppUser.Surname,
				JobOfferTitle = model.JobOffer.JobTitle,
				Date= model.Date,
				Status= model.Status,
				Score = model.Score,
				Evaluation = model.Evaluation,
				CvId=model.CvId
			};
		}
	}
}
