using System.ComponentModel.DataAnnotations;

namespace api.Models
{
	public class JobOffer
	{
		public int Id { get; set; }
		public string JobTitle { get; set; } = string.Empty;
		public int Salary { get; set; }
		public string Description { get; set; } = string.Empty;
	}
}
