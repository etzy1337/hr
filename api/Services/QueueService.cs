using System.Collections.Concurrent;

namespace api.Services
{
	public class QueueService : IQueueService
	{
		private readonly ConcurrentQueue<Guid> _queue = new();
		public void Enqueue(Guid applicationId)
		=> _queue.Enqueue(applicationId);

		public bool TryDequeue(out Guid applicationId)
		=>_queue.TryDequeue(out applicationId);
	}
}
