using System;
namespace iMessageServer.Models
{
    public class Message
    {
        public string guid { get; }
        public string text { get; }
        public bool isFromMe { get; }

        public Message(string guid, string text, bool isFromMe)
        {
            this.guid = guid;
            this.text = text;
            this.isFromMe = isFromMe;
        }

        public override bool Equals(object obj)
        {
            if (obj == null)
            {
                return false;
            }

            Message message = obj as Message;

            return guid.Equals(message.guid);
        }

        public override int GetHashCode()
        {
            return guid.GetHashCode();
        }
    }
}
