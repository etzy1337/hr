using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class OllamaController (IOllamaService ollamaService)
		: ControllerBase
	{
		[HttpGet]
		public async Task<IActionResult> Test()
		{
			var result = await ollamaService.SendPromptAsync("ghdrgesedf");

			return Ok(result);
		}
	}
}
