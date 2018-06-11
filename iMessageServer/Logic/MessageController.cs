using System.Collections.Generic;
using iMessageServer.Models;
using iMessageServer.Logic;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using iMessageServer.Models.Database;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace iMessageServer
{
    public class MessageController
    {
        private IHubContext<MessageHub> hub;
        private MessageDBContext context;

        public MessageController(IHubContext<MessageHub> messageHub, MessageDBContext context)
        {
            hub = messageHub;
            this.context = context;
        }

        // Conversations

        /// <summary>
        /// Adds a conversation to the DB if it does not already exist and stores the watched conversation in the message.
        /// Does not persist DB changes.
        /// </summary>
        /// <param name="message">Message in the conversation to add</param>
        public async Task AddMessageConversation(Message message)
        {
            var messageConversation = message.conversation;
            var addedConversation = await context.Conversations.Where(c => c.guid == messageConversation.guid).FirstOrDefaultAsync();

            if (addedConversation == null)
            {
                context.Conversations.Add(messageConversation);
                addedConversation = messageConversation;
            }

            message.conversation = addedConversation;
        }

        // Message

        public async Task AddMessage(Message message)
        {
            await AddMessageConversation(message);

            context.Messages.Add(message);

            await context.SaveChangesAsync();

            SendMessage(message);
        }

        public void SendMessage(Message message)
        {
            Object[] objects = new Object[1];
            objects[0] = message;
            hub.Clients.All.SendCoreAsync("ReceivedMessage", objects);
        }
    }
}
