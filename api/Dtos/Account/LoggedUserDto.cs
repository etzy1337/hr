namespace api.Dtos.Account
{
	public class LoggedUserDto
	{
		public string Name { get; set; } = string.Empty;
		public string Surname { get; set; } = string.Empty;
		public string Email { get; set; } = string.Empty;
		public IEnumerable<string> Roles { get; set; } =new List<string> ();
	}
}
