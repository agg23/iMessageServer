import { HubConnectionBuilder, HubConnection } from "@aspnet/signalr"
import { Controller } from "./controller"
import { IMessage } from "./models/message";

class Hub {
    connection: HubConnection = new HubConnectionBuilder().withUrl("/hub").build();
    controller: Controller;

    constructor(controller: Controller) {
        this.controller = controller;
        this.connection.on("ReceivedMessage", (message: IMessage) => this.receivedMessage(this.controller, message));
        this.controller.sendMessageFunction = (message: IMessage) => this.sendMessage(this.connection, message);
    }

    public connect() {
        this.connection.start().catch(err => console.error(err.toString()));
    }

    private receivedMessage(controller: Controller, message: IMessage) {
        console.log(message);

        controller.addMessage(message);
    }

    private sendMessage(connection: HubConnection, message: IMessage) {
        console.log("Sending");
        console.log(message);

        connection.send("SendMessage", message.guid, message.text);
    }
}

export { Hub }