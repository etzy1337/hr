namespace api.Models
{
	public class Application
	{
		public Guid Id { get; set; }
		public DateTime Date { get; set; }
		public string Status { get; set; } = string.Empty;
		public int? Score { get; set; }
		public string? Evaluation { get; set; }


		public string AppUserId { get; set; } = string.Empty;
		public AppUser AppUser { get; set; } 
		public int JobOfferId { get; set; }
		public JobOffer JobOffer { get; set; } 
		public int CvId { get; set; }
		public CV CV { get; set; }
	}
}
