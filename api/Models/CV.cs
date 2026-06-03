namespace api.Models
{
	public class CV
	{
		public int Id { get; set; }
		public string CvFileName { get; set; } = string.Empty;
		public byte[] CvData { get; set; }
	}
}
