import { IConversation } from "./models/conversation";
import { IMessage } from "./models/message";
import { UI } from "./ui.js";
import { ControllerState } from "./models/controllerstate.js";

class Controller {
    private state: ControllerState;
    private ui: UI;

    constructor() {
        this.state = new ControllerState();
        this.ui = new UI(this.state);

        console.log("Registering click");
        this.ui.registerConversationClick((element) => {
            console.log(element);
        });
    }

    // Conversations

    //public setActiveConversation(conversation: IConversation) {
    //    this.activeConversation = conversation;
    //}

    public addConversation(conversation: IConversation) {
        if (this.state.conversations.find(c => c.guid === conversation.guid) != null) {
            return;
        }

        this.state.conversations.push(conversation);

        var messages = new Array<IMessage>();
        this.state.messages.set(conversation.guid, messages);

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

        if (this.state.activeConversation != null && message.guid === this.state.activeConversation.guid) {
            this.ui.renderMessage(message);
        }
    }
}

export { Controller }