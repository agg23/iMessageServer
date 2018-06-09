using System.Collections.Generic;
using iMessageServer.Models;
using iMessageServer.Logic;
using Microsoft.AspNetCore.SignalR;
using System;

namespace iMessageServer
{
    public class MessageController
    {
        public Dictionary<Conversation, List<Message>> messages;

        private IHubContext<MessageHub> hub;

        public MessageController(IHubContext<MessageHub> messageHub)
        {
            hub = messageHub;
            messages = new Dictionary<Conversation, List<Message>>();
        }

        // Conversations

        public bool AddConversation(Conversation conversation)
        {
            if (!messages.ContainsKey(conversation))
            {
                messages[conversation] = new List<Message>();
                return true;
            }

            return false;
        }

        // Message

        public void AddMessage(Message message, Conversation conversation)
        {
            AddConversation(conversation);

            var list = messages[conversation];
            list.Add(message);

            SendMessage(message, conversation);
        }

        public void SendMessage(Message message, Conversation conversation)
        {
            Object[] objects = new Object[2];
            objects[0] = message;
            objects[1] = conversation;
            hub.Clients.All.SendCoreAsync("broadcastMessage", objects);
        }
    }
}
