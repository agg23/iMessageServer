import { IConversation } from "./models/conversation";
import { IMessage } from "./models/message";
import { UI } from "./ui.js";
import { ControllerState } from "./models/controllerstate.js";

class Controller {
    private state: ControllerState;
    private ui: UI;

    public sendMessageFunction: (IMessage) => void;

    constructor() {
        this.state = new ControllerState();
        this.state.loadState();
        this.ui = new UI(this.state);

        this.ui.registerConversationClick((element) => {
            var conversation = this.conversationFromGuid(element.id);
            if (conversation != null) {
                this.setActiveConversation(conversation);
            }
        });
        this.ui.registerSendClick((input: string) => {
            this.sendMessage(input, this.state.activeConversation);
        })

        this.ui.renderConversations();
    }

    // Conversations

    public conversationFromGuid(guid: string): IConversation {
        return this.state.conversations.find(c => c.guid === guid);
    }

    public setActiveConversation(conversation: IConversation) {
        if (this.state.activeConversation == conversation) {
            return;
        }

        this.state.activeConversation = conversation;

        // Select Conversation in UI
        this.ui.selectConversation(conversation);

        // Render Messages in selected Conversation
        this.ui.renderMessages();
    }

    public addConversation(conversation: IConversation) {
        if (this.conversationFromGuid(conversation.guid) != null) {
            return;
        }

        this.state.conversations.push(conversation);

        var messages = new Array<IMessage>();
        this.state.messages.set(conversation.guid, messages);

        this.state.saveState();

        this.ui.renderConversation(conversation);
    }

    // Messages

    public addMessage(message: IMessage) {
        var messages = this.state.messages.get(message.guid);

        if (messages == null) {
            messages = new Array<IMessage>();
            this.state.messages.set(message.guid, messages);
        }

        messages.push(message);

        this.state.saveState();

        if (this.state.activeConversation != null && message.guid === this.state.activeConversation.guid) {
            this.ui.renderMessage(message);
        }
    }

    public sendMessage(text: string, conversation: IConversation) {
        var message: IMessage = { "text": text, "guid": conversation.guid, "isFromMe": true };

        this.sendMessageFunction(message);
    }
}

export { Controller }