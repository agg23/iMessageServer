define(["require", "exports", "@aspnet/signalr"], function (require, exports, signalr_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Hub {
        constructor(controller) {
            this.connection = new signalr_1.HubConnectionBuilder().withUrl("/hub").build();
            this.controller = controller;
            this.connection.on("ReceivedMessage", (message) => this.receivedMessage(this.controller, message));
            this.controller.sendMessageFunction = (message) => this.sendMessage(this.connection, message);
        }
        connect() {
            this.connection.start().catch(err => console.error(err.toString()));
        }
        receivedMessage(controller, message) {
            console.log(message);
            controller.addMessage(message);
        }
        sendMessage(connection, message) {
            console.log("Sending");
            console.log(message);
            connection.send("SendMessage", message.guid, message.text);
        }
    }
    exports.Hub = Hub;
});
