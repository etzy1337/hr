namespace api.Interfaces
{
	public interface IAccountService
	{
		Task<AuthResultDto> Register(RegisterDto dto);
		Task<AuthResultDto> Login(LoginDto dto);
		Task<LoggedUserDto> AuthMe();
	}
}
