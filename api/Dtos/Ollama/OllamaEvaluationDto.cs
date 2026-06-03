namespace api.Dtos.Ollama
{
	public class OllamaEvaluationDto
	{
		public int Score { get; set; }
		public string Evaluation { get; set; } = string.Empty;
	}
}
