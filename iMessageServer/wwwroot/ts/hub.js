define(["require", "exports", "@aspnet/signalr"], function (require, exports, signalr_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Hub {
        constructor(controller) {
            this.connection = new signalr_1.HubConnectionBuilder().withUrl("/hub").build();
            this.controller = controller;
            this.connection.on("ReceivedMessage", (message) => this.receivedMessage(this.controller, message));
        }
        connect() {
            this.connection.start().catch(err => console.error(err.toString()));
        }
        receivedMessage(controller, message) {
            //console.log(conversation);
            console.log(message);
            controller.addMessage(message);
            //this.ui.addConversation(message.conversation);
        }
    }
    exports.Hub = Hub;
});
