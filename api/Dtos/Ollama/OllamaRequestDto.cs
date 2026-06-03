namespace api.Dtos.Ollama
{
	public class OllamaRequestDto
	{
		public string Model { get; set; } = "qwen2.5:3b";
		public string Prompt { get; set; } = string.Empty;
		public bool Stream { get; set; } = false;
	}
}
