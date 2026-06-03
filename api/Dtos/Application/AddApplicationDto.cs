using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Application
{
	public class AddApplicationDto
	{
		[Required]
		public int JobOfferId { get; set; }
		[Required(ErrorMessage ="CV is required")]
		public IFormFile CV { get; set; }
	}
}
