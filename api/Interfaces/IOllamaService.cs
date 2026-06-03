using api.Dtos.Ollama;

namespace api.Interfaces
{
	public interface IOllamaService
	{
		Task<OllamaResponseDto> SendPromptAsync(string prompt);
	}
}
