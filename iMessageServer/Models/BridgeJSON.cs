using System;
namespace iMessageServer.Models
{
    public class BridgeJSON
    {
        public string action;
        public Message message;
        public Conversation conversation;
        public Conversation[] conversations;
    }
}
