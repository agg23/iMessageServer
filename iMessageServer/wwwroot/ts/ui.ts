import { ControllerState } from "./models/controllerstate";
import { IMessage } from "./models/message";
import { IConversation } from "./models/conversation";

class UI {
    private state: ControllerState;

    constructor(state: ControllerState) {
        this.state = state;
    }

    public registerConversationClick(funct: (element) => void) {
        $(".conversations").on("click", ".conversation", funct);
    }

    public renderConversation(conversation: IConversation) {
        $(".conversations").append("<div class=\"conversation\" id=\""
            + conversation.guid + "\">" + conversation.user + "</div>");
    }

    public renderMessages() {
        if (this.state.activeConversation == null) {
            return;
        }

        // Clear div
        $(".messages").empty();

        let messages = this.state.messages.get(this.state.activeConversation.guid);
        for (let message of messages) {
            this.renderMessage(message);
        }
    }

    public renderMessage(message: IMessage) {
        $(".messages").append("<div><div>" + message.text + "</div><div>" + message.isFromMe + "</div></div>");
    }
}

export { UI }