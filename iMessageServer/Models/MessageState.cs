using System;
using System.Collections.Generic;
namespace iMessageServer.Models
{
    public class MessageState
    {
        public static MessageState Instance = new MessageState();

        public Dictionary<Conversation, List<Message>> messages;

        public MessageState()
        {
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
        }
    }
}
