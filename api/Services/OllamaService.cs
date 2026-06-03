using System.Text;
using System.Text.Json;

namespace api.Services
{
	public class OllamaService (HttpClient httpClient)
		: IOllamaService
	{
		public async Task<OllamaResponseDto> SendPromptAsync(string prompt)
		{
			var request = new OllamaRequestDto
			{
				Model = "qwen2.5:3b",
				Prompt = prompt,
				Stream = false
			};

			var json = JsonSerializer.Serialize(request);

			var content = new StringContent(json, Encoding.UTF8, "application/json");

			var response = await httpClient.PostAsync(
				"http://ollama:11434/api/generate",
				content);

			if (!response.IsSuccessStatusCode)
			{
				throw new Exception();
			}

			var requestBody = await response.Content.ReadAsStringAsync();
			

			using var doc = JsonDocument.Parse(requestBody);

			var result = doc.RootElement.GetProperty("response").GetString();

			return new OllamaResponseDto
			{
				Response = result ?? string.Empty
			};
		}
	}
}
