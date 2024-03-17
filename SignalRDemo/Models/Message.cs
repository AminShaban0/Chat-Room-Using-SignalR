namespace SignalRDemo.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        public string MessageText { get; set; }
        public string UserName { get; set; }
        public DateTimeOffset Date { get; set; } = DateTimeOffset.UtcNow;

    }
}
