using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iMessageServer.Models
{
    public class Message
    {
        [Key]
        public int id { get; set; }

        [Index]
        public string guid { get; set; }
        public string text { get; set; }
        public bool isFromMe { get; set; }

        [JsonIgnore]
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
