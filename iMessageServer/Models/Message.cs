using System;
using System.ComponentModel.DataAnnotations;

namespace iMessageServer.Models
{
    public class Message
    {
        [Key]
        public int id { get; set; }

        public string guid { get; }
        public string text { get; set; }
        public bool isFromMe { get; set; }
        public Conversation conversation { set; get; }

        public Message(string guid, string text, bool isFromMe)
        {
            this.guid = guid;
            this.text = text;
            this.isFromMe = isFromMe;
        }

        public override bool Equals(object obj)
        {
            if (obj == null || obj.GetType() != typeof(Message))
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
