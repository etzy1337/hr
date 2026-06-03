namespace api.Dtos.JobOffer
{
	public class GetJobOfferDto
	{
		public int Id { get; set; }
		public string JobTitle { get; set; } = string.Empty;
		public int Salary { get; set; }
		public string Description { get; set; } = string.Empty;
	}
}
