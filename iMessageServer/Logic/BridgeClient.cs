using System;
using System.Threading;
using System.Text;

using System.Net.WebSockets;
using System.Threading.Tasks;
using Newtonsoft.Json;
using iMessageServer.Utility;
using iMessageServer.Models;

namespace iMessageServer
{
    public class BridgeClient
    {
        private const int CHUNK_SIZE = 1024;

        private ClientWebSocket client = new ClientWebSocket();

        public BridgeClient()
        {
            Connect();
        }

        private async void Connect()
        {
            Console.WriteLine("Setting up WebSockets");

            var token = new CancellationToken();
            await client.ConnectAsync(new Uri("ws://localhost:9000"), token);

            Console.WriteLine(token);

            Listen();
        }

        private async void Listen()
        {
            var buffer = new byte[CHUNK_SIZE];

            var token = new CancellationToken();

            while (client.State == WebSocketState.Open)
            {
                WebSocketReceiveResult result;

                var finalString = new StringBuilder();

                do
                {
                    result = await client.ReceiveAsync(new ArraySegment<byte>(buffer), token);

                    if (result.MessageType == WebSocketMessageType.Text)
                    {
                        finalString.Append(Encoding.UTF8.GetString(buffer, 0, result.Count));
                    }

                } while (!result.EndOfMessage);

                #pragma warning disable CS4014 // Because this call is not awaited, execution of the current method continues before the call is completed
                Task.Run(() => OnText(finalString.ToString()));
                #pragma warning restore CS4014 // Because this call is not awaited, execution of the current method continues before the call is completed
            }
        }

        private void OnText(String stringValue)
        {
            //Console.WriteLine(stringValue);

            //dynamic json = JsonConvert.DeserializeObject(stringValue);

            //if (!ExpandoObjectHelper.HasProperty(json, "action"))
            //{
            //    // Invalid Response
            //    return;
            //}

            //var action = json.action;

            //if (action == "received")
            //{
            //    var 
            //}

            var json = new BridgeJSON();

            try
            {
                json = JsonConvert.DeserializeObject<BridgeJSON>(stringValue);
            }
            catch (JsonReaderException e)
            {
                Console.WriteLine(e);
                return;
            }

            Console.WriteLine(json);
            Console.WriteLine(json.action);
            Console.WriteLine(json.message);
            Console.WriteLine(json.conversation);

            switch (json.action)
            {
                case "received":
                    OnReceivedMessage(json.message, json.conversation);
                    break;
                case "delivered":
                    OnDeliveredMessage(json.message, json.conversation);
                    break;
                case "read":
                    OnReadMessage(json.message, json.conversation);
                    break;
                case "sent":
                    OnSentMessage(json.message, json.conversation);
                    break;
                case "sendFailed":
                    OnSendFailedMessage(json.message, json.conversation);
                    break;
                case "addedConversations":
                    OnAddedConversations(json.conversations);
                    break;
                case "removedConversations":
                    OnRemovedConversations(json.conversations);
                    break;
            }
        }

        private void OnReceivedMessage(Message message, Conversation conversation)
        {
            MessageController.Instance.AddMessage(message, conversation);
        }

        private void OnDeliveredMessage(Message message, Conversation conversation)
        {

        }

        private void OnReadMessage(Message message, Conversation conversation)
        {

        }

        private void OnSentMessage(Message message, Conversation conversation)
        {

        }

        private void OnSendFailedMessage(Message message, Conversation conversation)
        {

        }

        private void OnAddedConversations(Conversation[] conversations)
        {

        }

        private void OnRemovedConversations(Conversation[] conversations)
        {

        }
    }
}
