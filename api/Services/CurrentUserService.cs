using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace api.Services
{
	public class CurrentUserService(IHttpContextAccessor accessor,UserManager<AppUser>userManager)
	{
		public string? UserId =>
			accessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);

		public async Task<AppUser?>GetUserAsync()
		{
			if(UserId == null)
			{
				return null;
			}
			return await userManager.FindByIdAsync(UserId);
		}
	}
}
