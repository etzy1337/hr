namespace api.Interfaces
{
	public interface IOcrService
	{
		Task<OcrResultDto> ExtractTextAsync(byte[] fileBytes, string fileName);
	}
}
