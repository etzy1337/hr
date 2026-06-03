
using System.Text.Json;

namespace api.Services
{
	public class ApplicationBackgroundService(IServiceScopeFactory scopeFactory, IQueueService queueService)
		: BackgroundService
	{
		protected override async Task ExecuteAsync(CancellationToken stoppingToken)
		{
			while(!stoppingToken.IsCancellationRequested)
			{
				if(!queueService.TryDequeue(out var applicationId))
				{
					await Task.Delay(100,stoppingToken);
					continue;
				}

				using var scope = scopeFactory.CreateScope();

				var appRepo = scope.ServiceProvider.GetRequiredService<IApplicationRepository>();
				var ocr = scope.ServiceProvider.GetRequiredService<IOcrService>();
				var ollama = scope.ServiceProvider.GetRequiredService<IOllamaService>();

				var application = await appRepo.GetByIdAsync(applicationId);
				var job = application.JobOffer;
				var cv = application.CV;

				var cvText = await ocr.ExtractTextAsync(cv.CvData, cv.CvFileName);
				if (!cvText.IsSuccess)
					continue;

				var prompt =$@"
				You are HR assistant.

				Job:
				{{{job.JobTitle}}}
				{{{job.Description}}}

				CV:
				{{{cvText.Text}}}
				Return ONLY raw JSON. No markdown. No ``` fences:
				{{{{
				  """"score"""": 1-10,
				  """"evaluation"""": """"explanation""""
				}}}}";

				var ollamaResult = await ollama.SendPromptAsync(prompt);
				

				OllamaEvaluationDto? result = null;

				try
				{
					result = JsonSerializer.Deserialize<OllamaEvaluationDto>(
						ollamaResult.Response,
						new JsonSerializerOptions
						{
							PropertyNameCaseInsensitive = true
						});
				}catch
				{
					application.Status = "AI_PARSE_ERROR";
					await appRepo.UpdateAsync(application);
				}
				if(result!=null)
				{
					application.Score = result.Score;
					application.Evaluation = result.Evaluation;
					application.Status = "Evaluated";

					await appRepo.UpdateAsync(application);
				}
			}
		}
	}
}
