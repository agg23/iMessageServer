using System;
using System.Threading;
using System.Text;

using System.Net.WebSockets;
using System.Threading.Tasks;

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
            Console.WriteLine(stringValue);
        }
    }
}
