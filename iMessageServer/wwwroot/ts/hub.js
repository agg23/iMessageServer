define(["require", "exports", "@aspnet/signalr"], function (require, exports, signalr_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Hub {
        constructor() {
            this.connection = new signalr_1.HubConnectionBuilder().withUrl("/hub").build();
            this.connection.on("ReceivedMessage", this.receivedMessage);
        }
        connect() {
            this.connection.start().catch(err => console.error(err.toString()));
        }
        receivedMessage(message, conversation) {
            console.log(conversation);
            console.log(message);
        }
    }
    exports.Hub = Hub;
});
