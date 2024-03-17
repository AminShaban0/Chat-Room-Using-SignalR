using Microsoft.AspNetCore.SignalR;
using SignalRDemo.Context;
using SignalRDemo.Models;

namespace SignalRDemo.Hubs
{
    public class ChatHub:Hub
    {
        private readonly ILogger<ChatHub> _logger;
        private readonly ChatDbContext _dbContext;

        public ChatHub(ILogger<ChatHub> logger , ChatDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }
        public async Task Send(string user , string message)
        {
           await Clients.Others.SendAsync("ResivieMessage", user, message);
            Message msg = new Message()
            {
                UserName = user,
                MessageText = message
            };
            _dbContext.Messages.Add(msg);
            await _dbContext.SaveChangesAsync();

        }
        public async Task JoinTOGroup(string groupname , string username)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupname);
            await Clients.OthersInGroup(groupname).SendAsync("newMemberJoin",username,groupname);
            _logger.LogInformation(Context.ConnectionId);
        }
        public async Task SendToGroup(string groupname,string sender, string message)
        {
            await Clients.Group(groupname).SendAsync("ReceiveMessageGroup", sender , message);
            Message msg = new Message()
            {
                UserName = sender,
                MessageText = message
            };
            _dbContext.Messages.Add(msg);
            await _dbContext.SaveChangesAsync();

        }
    }
}
