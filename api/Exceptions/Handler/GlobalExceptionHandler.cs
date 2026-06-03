using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace api.Exceptions.Handler
{
	public class GlobalExceptionHandler : IExceptionHandler
	{
		public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
		{
			var problemDetails = new ProblemDetails
			{
				Instance = httpContext.Request.Path,
				Detail = exception.Message
			};

			switch(exception)
			{
				case NotFoundException:
					problemDetails.Title = "Resource not found";
					problemDetails.Status = StatusCodes.Status404NotFound;
					break;

				case BadRequestException:
					problemDetails.Title = "Bad Request";
					problemDetails.Status = StatusCodes.Status400BadRequest;
					break;

				case InvalidCredentialException:
					problemDetails.Title = "Invalid Credentials";
					problemDetails.Status = StatusCodes.Status401Unauthorized;
					break;

				case UnauthorizedException:
					problemDetails.Title = "Unauthorized";
					problemDetails.Status = StatusCodes.Status401Unauthorized;
					break;

				default:
					problemDetails.Title = "Internal Server Error";
					problemDetails.Detail = "An unexpected error occurred";
					problemDetails.Status = StatusCodes.Status500InternalServerError;
					break;
			}
			httpContext.Response.StatusCode = problemDetails.Status.Value;

			await httpContext.Response.WriteAsJsonAsync(problemDetails,cancellationToken);

			return true;
		}
	}
}
