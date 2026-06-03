namespace api.Dtos.Application
{
	public class GetGroupedApplicationsDto
	{
		public string JobOfferTitle { get; set; } = string.Empty;
		public List<GroupedApps> applications { get; set; } = new();
	}

	public class GroupedApps
	{
		public Guid Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Surname { get; set; } = string.Empty;
		public DateTime Date { get; set; }
		public int CvId { get; set; }
		public string CvFileName { get; set; } = string.Empty;
		public string Status { get; set; } = string.Empty;
		public int? Score { get; set; }
		public string? Evaluation { get; set; }

	}
}
