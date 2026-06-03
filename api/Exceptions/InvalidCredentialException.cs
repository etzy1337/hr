namespace api.Exceptions
{
	public class InvalidCredentialException :Exception
	{
		public InvalidCredentialException() : base("Invalid email or password")
		{
			
		}
	}
}
