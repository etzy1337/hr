using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class OcrController (IOcrService ocrService, ICvRepository cvRepository)
		: ControllerBase
	{
		[HttpGet]
		public async Task<IActionResult> TestOcr()
		{
			var cv = await cvRepository.GetByIdAsync(2);
			var result = await ocrService.ExtractTextAsync(cv.CvData, cv.CvFileName);

			return Ok(result);
		}
	}
}
