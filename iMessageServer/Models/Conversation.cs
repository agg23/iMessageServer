﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iMessageServer.Models
{
    public class Conversation
    {
        [Key]
        public int id { get; set; }

        [Index(IsUnique = true)]
        public string guid { get; set; }

        public string accountType { get; set; }
        public string user { get; set; }
        public bool isGroupChat { get; set; }

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
