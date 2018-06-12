import { IConversation } from "./conversation";
import { IMessage } from "./message";

class ControllerState {
    public conversations: Array<IConversation> = new Array<IConversation>();
    public messages: Map<string, Array<IMessage>> = new Map<string, Array<IMessage>>();

    public activeConversation: IConversation;

    public saveState() {
        localStorage.setItem("conversations", JSON.stringify(this.conversations));
        localStorage.setItem("messages", JSON.stringify(this.messages));

        var guid = this.activeConversation != null ? this.activeConversation.guid : null;
        localStorage.setItem("activeConversationGuid", guid);
    }

    public loadState() {
        console.log("Loading application state");

        var loadedConversations: Array<IConversation> = JSON.parse(localStorage.getItem("conversations"));
        var conversations = new Array<IConversation>();

        for (let conversation of loadedConversations) {
            conversations.push(conversation);
        }

        if (conversations !instanceof Array) {
            console.log("Conversation cast failed");
        }

        this.conversations = conversations;

        var loadedMessages: Map<string, Array<IMessage>> = JSON.parse(localStorage.getItem("messages"));
        var messages = new Map<string, Array<IMessage>>();

        for (let guid in loadedMessages) {
            var loadedGuidMessages = loadedMessages[guid];

            var guidMessages = new Array<IMessage>();
            for (let message of loadedGuidMessages) {
                guidMessages.push(message);
            }

            messages.set(guid, guidMessages);
        }

        if (messages! instanceof Map) {
            console.log("Messages cast failed");
        }
        this.messages = messages;

        var guid = localStorage.getItem("activeConversationGuid");
        this.activeConversation = this.conversations.find(c => c.guid === guid);
    }
}

export { ControllerState }