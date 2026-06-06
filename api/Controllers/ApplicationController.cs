using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ApplicationController(IApplicationService applicationService, IQueueService queueService,IApplicationRepository applicationRepository)
		: ControllerBase
	{
		[HttpPost]
		[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
		public async Task<IActionResult> CreateApplication([FromForm] AddApplicationDto dto)
		{
			var result = await applicationService.CreateApplicationAsync(dto);

			return Ok(result);
		}
		[Authorize(Roles = "Admin,Examiner")]
		[HttpGet("GetGroupedApplications")]
		public async Task<IActionResult> GetGroupedApplications()
		{
			var result = await applicationService.GetGroupedApplicationsAsync();
			return Ok(result);
		}
		[Authorize]
		[HttpGet("{id}")]
		public async Task<IActionResult>GetApplication(Guid id)
		{
			var result = await applicationService.GetApplicationAsync(id);
			return Ok(result);
		}
		[Authorize(Roles = "Admin,Examiner")]
		[HttpGet("EvaluateRetry")]
		public IActionResult EvaluateRetry(Guid appId)
		{
			queueService.Enqueue(appId);

			return Ok();
		}
		[Authorize(Roles = "Admin,Examiner")]
		[HttpGet("GetUsersApplications")]
		public async Task<IActionResult> GetUsersApplications()
		{
			var result = await applicationService.GetUserApplications();

			return Ok(result);
		}
		[Authorize(Roles = "Admin,Examiner")]
		[HttpPut("RejectApp")]
		public async Task<IActionResult>RejectApp(Guid id)
		{
			await applicationRepository.RejectApplicationAsync(id);
			return Ok();
		}
		[Authorize(Roles = "Admin,Examiner")]
		[HttpPut("AcceptApp")]
		public async Task<IActionResult> AcceptApp(Guid id)
		{
			await applicationRepository.AcceptApplicationAsync(id);
			return Ok();
		}

	}
}
