import { HubConnectionBuilder, HubConnection } from "@aspnet/signalr"

class Hub {
    connection: HubConnection = new HubConnectionBuilder().withUrl("/hub").build();

    constructor() {
        this.connection.on("ReceivedMessage", this.receivedMessage);
    }

    public connect() {
        this.connection.start().catch(err => console.error(err.toString()));
    }

    private receivedMessage(message, conversation) {
        console.log(conversation);
        console.log(message);
    }
}

export { Hub }