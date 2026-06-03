namespace api.Dtos.Ocr
{
	public class OcrResultDto
	{
		public string Text { get; set; } = string.Empty;
		public bool IsSuccess { get; set; }
		public string? ErrorMessage { get; set; }
	}
}
