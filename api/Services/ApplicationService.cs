using api.Mappers;

namespace api.Services
{
	public class ApplicationService
		(IJobOfferRepository offerRepository, IApplicationRepository applicationRepository, CurrentUserService currentUserService, ICvRepository cvRepository, IQueueService queueService)
		: IApplicationService
	{
		public async Task<GetApplicationDto> CreateApplicationAsync(AddApplicationDto dto)
		{
			var offer = await offerRepository.GetByIdAsync(dto.JobOfferId);
			if (offer == null)
				throw new NotFoundException("Job offer not found");

			var user = await currentUserService.GetUserAsync();
			if (user == null)
				throw new UnauthorizedException();

			if (await applicationRepository.ApplicationExistAsync(offer.Id, user.Id))
				throw new BadRequestException("You have already applied for this job offer");

			var application = new Application
			{
				Date = DateTime.UtcNow,
				Status = "New",
				AppUserId = user.Id,
				JobOfferId = dto.JobOfferId
			};

			if (dto.CV != null && dto.CV.Length > 0)
			{
				using var ms = new MemoryStream();
				await dto.CV.CopyToAsync(ms);

				var cv = new CV
				{
					CvFileName = dto.CV.FileName,
					CvData = ms.ToArray()
				};
				await cvRepository.AddAsync(cv);

				application.CvId = cv.Id;
			}
			else throw new BadRequestException("CV is required");

			var appResult = await applicationRepository.AddAsync(application);

			var result = new GetApplicationDto
			{
				Id= appResult.Id,
				Name=user.Name,
				Surname=user.Surname,
				JobOfferTitle = offer.JobTitle,
				Date = appResult.Date,
				Status = appResult.Status,
				CvId=appResult.CvId
			};

			queueService.Enqueue(result.Id);
			
			return result;


		}

		public async Task<GetApplicationDto> GetApplicationAsync(Guid id)
		{
			var application = await applicationRepository.GetByIdAsync(id);

			return application.toGetApplicationDto();
		}

		public async Task<IEnumerable<GetGroupedApplicationsDto>> GetGroupedApplicationsAsync()
		{
			var applications = await applicationRepository.GetAllAsync();

			var result = applications.GroupBy(x => x.JobOffer.JobTitle)
				.Select(x => new GetGroupedApplicationsDto
				{
					JobOfferTitle = x.Key,
					applications = x.Select(x => new GroupedApps
					{
						Id = x.Id,
						Name = x.AppUser.Name,
						Surname = x.AppUser.Surname,
						Date = x.Date,
						CvId = x.CvId,
						CvFileName = x.CV.CvFileName,
						Status = x.Status,
						Score=x.Score,
						Evaluation=x.Evaluation
					}).ToList()
				}).ToList();

			return result;
		}

		public async Task<IEnumerable<GetApplicationDto>> GetUserApplications()
		{
			var userId = currentUserService.UserId;

			if (userId == null)
				throw new UnauthorizedException();

			var applications = await applicationRepository.GetApplicationsByUserIdAsync(userId);

			return applications.Select(x => x.toGetApplicationDto());
		}
	}
}
