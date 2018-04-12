using System;
namespace iMessageServer.Models
{
    public class Conversation
    {
        public string guid;
        public string accountType;
        public string user;
        public bool isGroupChat;

		public override bool Equals(object obj)
		{
            if (obj == null)
            {
                return false;
            }

            Conversation conversation = obj as Conversation;

            return guid.Equals(conversation.guid);
		}

		public override int GetHashCode()
		{
            return guid.GetHashCode();
		}
	}
}
