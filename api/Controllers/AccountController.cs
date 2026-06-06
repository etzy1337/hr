using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AccountController (IAccountService accountService)
		: ControllerBase
	{
		[HttpPost("register")]
		public async Task<IActionResult> Register([FromBody]RegisterDto registerDto)
		{
			if(!ModelState.IsValid)
				return BadRequest(ModelState);

			var result = await accountService.Register(registerDto);

			Response.Cookies.Append("jwt", result.Token, new CookieOptions
			{
				HttpOnly = true,
				Secure = true,
				SameSite = SameSiteMode.None,
				Expires = DateTime.UtcNow.AddDays(7)
			});

			return Ok(new LoggedUserDto
			{
				Name = result.Name,
				Surname = result.Surname,
				Email = result.Email,
				Roles = result.Roles,
			});
		}
		[HttpPost("login")]
		public async Task<IActionResult> Login([FromBody]LoginDto loginDto)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var result = await accountService.Login(loginDto);

			Response.Cookies.Append("jwt", result.Token, new CookieOptions
			{
				HttpOnly = true,
				Secure = true,
				SameSite = SameSiteMode.None,
				Expires = DateTime.UtcNow.AddDays(7)
			});

			return Ok(new LoggedUserDto
			{
				Name = result.Name,
				Surname = result.Surname,
				Email = result.Email,
				Roles = result.Roles,
			});
		}
		[HttpPost("logout")]
		public IActionResult Logout()
		{
			Response.Cookies.Delete("jwt");
			return Ok(new { message = "Logged out successfully" });
		}
		[Authorize]
		[HttpGet("AuthMe")]
		public async Task<IActionResult>AuthMe()
		{
			var result = await accountService.AuthMe();
			return Ok(result);
		}
	}
}
