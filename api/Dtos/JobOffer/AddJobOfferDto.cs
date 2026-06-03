using System.ComponentModel.DataAnnotations;

namespace api.Dtos.JobOffer
{
	public class AddJobOfferDto
	{
		[Required(ErrorMessage = "Job title is required")]
		[StringLength(100, MinimumLength = 3, ErrorMessage = "Job title must be between 3 and 100 characters")]
		public string JobTitle { get; set; } = string.Empty;

		[Range(1, 1_000_000, ErrorMessage = "Salary must be between 1 and 1,000,000")]
		public int Salary { get; set; }

		[Required(ErrorMessage = "Description is required")]
		[StringLength(2000, MinimumLength = 10, ErrorMessage = "Description must be between 10 and 2000 characters")]
		public string Description { get; set; } = string.Empty;
	}
}
