using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Account
{
	public class RegisterDto
	{
		[Required(ErrorMessage = "Name is required")]
		[StringLength(50, MinimumLength = 2, ErrorMessage = "Name must be between 2 and 50 characters")]
		public string Name { get; set; } = string.Empty;

		[Required(ErrorMessage = "Surname is required")]
		[StringLength(50, MinimumLength = 2, ErrorMessage = "Surname must be between 2 and 50 characters")]
		public string Surname { get; set; } = string.Empty;

		[Required(ErrorMessage = "Email is required")]
		[EmailAddress(ErrorMessage = "Invalid email format")]
		public string Email { get; set; } = string.Empty;

		[Required(ErrorMessage = "Password is required")]
		[MinLength(8, ErrorMessage = "Password must be at least 8 characters long")]
		public string Password { get; set; } = string.Empty;
	}
}