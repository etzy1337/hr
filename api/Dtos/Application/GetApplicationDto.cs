namespace api.Dtos.Application
{
	public class GetApplicationDto
	{
		public Guid Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Surname { get; set; } = string.Empty;
		public string JobOfferTitle { get; set; } = string.Empty;
		public DateTime Date { get; set; }
		public string Status { get; set; } = string.Empty;
		public int? Score { get; set; }
		public string? Evaluation { get; set; } = string.Empty;
		public int CvId{ get; set; }
	}
}
