namespace api.Interfaces
{
	public interface IQueueService
	{
		void Enqueue(Guid applicationId);
		bool TryDequeue(out Guid applicationId);
	}
}
