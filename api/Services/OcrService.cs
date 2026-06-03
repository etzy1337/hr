using System.Text.Json;

namespace api.Services
{
	public class OcrService (HttpClient httpClient,IConfiguration config)
		: IOcrService
	{
		public async Task<OcrResultDto> ExtractTextAsync(byte[]fileBytes, string fileName)
		{
			using var form = new MultipartFormDataContent();

			form.Add(new ByteArrayContent(fileBytes), "file", fileName);
			form.Add(new StringContent("pol"), "language");
			form.Add(new StringContent("false"), "isOverlayRequired");

			httpClient.DefaultRequestHeaders.Remove("apikey");
			httpClient.DefaultRequestHeaders.Add("apikey", config["OCR:ApiKey"]);

			
			var response = await httpClient.PostAsync("https://api.ocr.space/parse/image",
						form
						);
			

			var json = await response.Content.ReadAsStringAsync();

			if (!response.IsSuccessStatusCode)
			{
				return new OcrResultDto
				{
					IsSuccess = false,
					ErrorMessage = json
				};
			}
			using var doc = JsonDocument.Parse(json);

			var text = doc.RootElement
				.GetProperty("ParsedResults")[0]
				.GetProperty("ParsedText")
				.GetString();

			return new OcrResultDto
			{
				IsSuccess = true,
				Text = text
			};
		}
	}
}
