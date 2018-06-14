using System;
using Microsoft.AspNetCore.SignalR;
using iMessageServer.Models;
namespace iMessageServer.Logic
{
    public class MessageHub: Hub
    {
        private BridgeClient client;

        public MessageHub(BridgeClient client)
        {
            this.client = client;
        }

        public void SendMessage(string guid, string text)
        {
            Console.WriteLine(text);
            this.client.SendMessage(new Message(guid, text, true));
        }
    }
}
