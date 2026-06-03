
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace api.Services
{
	public class TokenService
		: ITokenService
	{
		private readonly IConfiguration _config;
		private readonly SymmetricSecurityKey _key;
		public TokenService(IConfiguration config)
		{
			_config = config;
			_key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SigningKey"]!));
		}
		public string CreateToken(AppUser user, IEnumerable<string> roles)
		{
			var claims = new List<Claim>
			{
				new Claim(ClaimTypes.NameIdentifier, user.Id),
				new Claim(ClaimTypes.Email, user.Email!),
			};
			foreach(var role in roles)
			{
				claims.Add(new Claim(ClaimTypes.Role, role));
			}
			var credentials = new SigningCredentials(_key,SecurityAlgorithms.HmacSha256);

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(claims),
				Expires = DateTime.UtcNow.AddDays(7),
				Issuer = _config["JWT:Issuer"],
				Audience = _config["JWT:Audience"],
				SigningCredentials = credentials
			};
			var tokenHandler = new JwtSecurityTokenHandler();

			var token = tokenHandler.CreateToken(tokenDescriptor);

			return tokenHandler.WriteToken(token);
		}
	}
}
