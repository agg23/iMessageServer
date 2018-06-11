using System;
using System.Threading;
using System.Text;

using System.Net.WebSockets;
using System.Threading.Tasks;
using Newtonsoft.Json;
using iMessageServer.Utility;
using iMessageServer.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace iMessageServer
{
    public class BridgeClient
    {
        private const int CHUNK_SIZE = 1024;

        private ClientWebSocket client = new ClientWebSocket();
        private IServiceProvider serviceProvider;

        public BridgeClient(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;

            Connect();
        }

        private async void Connect()
        {
            Console.WriteLine("Setting up WebSockets");

            var token = new CancellationToken();
            // TODO: Handle can't connect
            await client.ConnectAsync(new Uri("ws://172.16.212.1:9000"), token);

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

            var message = json.message;

            switch (json.action)
            {
                case "received":
                    message.conversation = json.conversation;
                    OnReceivedMessage(message);
                    break;
                case "delivered":
                    message.conversation = json.conversation;
                    OnDeliveredMessage(message);
                    break;
                case "read":
                    message.conversation = json.conversation;
                    OnReadMessage(message);
                    break;
                case "sent":
                    message.conversation = json.conversation;
                    OnSentMessage(message);
                    break;
                case "sendFailed":
                    message.conversation = json.conversation;
                    OnSendFailedMessage(message);
                    break;
                case "addedConversations":
                    OnAddedConversations(json.conversations);
                    break;
                case "removedConversations":
                    OnRemovedConversations(json.conversations);
                    break;
            }
        }

        private void OnReceivedMessage(Message message)
        {
            //new MessageController().AddMessage(message);
            using (var serviceScope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var messageController = (MessageController)serviceScope.ServiceProvider.GetService<MessageController>();
                messageController.AddMessage(message);
            }
            //var messageController = (MessageController)serviceProvider.GetService(typeof(MessageController));
            //messageController.AddMessage(message);
        }

        private void OnDeliveredMessage(Message message)
        {

        }

        private void OnReadMessage(Message message)
        {

        }

        private void OnSentMessage(Message message)
        {

        }

        private void OnSendFailedMessage(Message message)
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
