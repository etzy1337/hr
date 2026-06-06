using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class JobOfferController (IJobOfferRepository jobOfferRepository)
		: ControllerBase
	{
		[HttpGet]
		public async Task<IActionResult>GetAll()
		{
			var offers = await jobOfferRepository.GetAllAsync();
			var result = offers.Select(x=>x.Adapt<GetJobOfferDto>());
			return Ok(result);
		}
		[Authorize(Roles = "Admin")]
		[HttpPost]
		public async Task<IActionResult>Post(AddJobOfferDto dto)
		{
			if(!ModelState.IsValid)
				return BadRequest(ModelState);

			var jobOffer = dto.Adapt<JobOffer>();

			var result = await jobOfferRepository.AddJobOfferAsync(jobOffer);

			return Ok(result);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetById(int id)
		{
			var jobOffer = await jobOfferRepository.GetByIdAsync(id);
			var result = jobOffer.Adapt<GetJobOfferDto>();

			return Ok(result);
		}
		[Authorize(Roles = "Admin")]
		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			await jobOfferRepository.RemoveAsync(id);

			return Ok();
		}

	}
}
