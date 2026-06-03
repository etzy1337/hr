
using Microsoft.AspNetCore.Identity;

namespace api.Services
{
	public class AccountService(UserManager<AppUser>userManager,SignInManager<AppUser>signInManager,ITokenService tokenService,CurrentUserService currentUserService)
		: IAccountService
	{
		public async Task<LoggedUserDto> AuthMe()
		{
			var user = await currentUserService.GetUserAsync();
			if (user == null)
				throw new UnauthorizedException();

			var roles = await userManager.GetRolesAsync(user);

			return new LoggedUserDto
			{
				Name = user.Name,
				Surname = user.Surname,
				Email = user.Email!,
				Roles = roles
			};
		}

		public async Task<AuthResultDto> Login(LoginDto dto)
		{
			var user = await userManager.FindByEmailAsync(dto.Email);
			if (user is null)
				throw new InvalidCredentialException();

			var result = await signInManager.CheckPasswordSignInAsync(user, dto.Password, false);
			if (!result.Succeeded)
				throw new InvalidCredentialException();

			var roles = await userManager.GetRolesAsync(user);
			var token = tokenService.CreateToken(user, roles);

			return new AuthResultDto
			{
				Token = token,
				Email = dto.Email,
				Name = user.Name,
				Surname = user.Surname,
				Roles = roles
			};
		}

		public async Task<AuthResultDto> Register(RegisterDto dto)
		{
			var existingUser = await userManager.FindByEmailAsync(dto.Email);
			if (existingUser != null)
				throw new BadRequestException("Email is already taken");

			var user = new AppUser
			{
				UserName=dto.Email,
				Name = dto.Name,
				Surname = dto.Surname,
				Email = dto.Email,
			};

			var result = await userManager.CreateAsync(user,dto.Password);

			if (!result.Succeeded)
			{
				var message = result.Errors.Select(e => e.Description).First();
				throw new BadRequestException(message);
			}
				

			var result2 = await userManager.AddToRoleAsync(user, "User");
			if(!result2.Succeeded)
			{
				await userManager.DeleteAsync(user);

				var message = result2.Errors.Select(e => e.Description).First();
				throw new BadRequestException(message);
			}

			var token = tokenService.CreateToken(user, new List<string> { "User" });

			return new AuthResultDto
			{
				Token = token,
				Email = dto.Email,
				Name = dto.Name,
				Surname = dto.Surname,
				Roles=new List<string> { "User"}
			};
		}
	}
}
