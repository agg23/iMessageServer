import { ControllerState } from "./models/controllerstate";
import { IMessage } from "./models/message";
import { IConversation } from "./models/conversation";

class UI {
    private state: ControllerState;

    constructor(state: ControllerState) {
        this.state = state;
    }

    // Conversations

    public selectConversation(conversation: IConversation) {
        if (conversation == null) {
            return;
        }

        // Clear all selected tags
        $(".conversation").removeClass("selected");

        $(".conversation#" + conversation.guid).addClass("selected");
    }

    public registerConversationClick(funct: (element) => void) {
        $(".conversations").on("click", ".conversation", (event) => funct(event.target));
    }

    public renderConversations() {
        for (let conversation of this.state.conversations) {
            this.renderConversation(conversation);
        }

        this.selectConversation(this.state.activeConversation);
    }

    public renderConversation(conversation: IConversation) {
        $(".conversations").append("<div class=\"conversation\" id=\""
            + conversation.guid + "\">" + conversation.user + "</div>");
    }

    // Messages

    public renderMessages() {
        if (this.state.activeConversation == null) {
            return;
        }

        // Clear div
        $(".messages").empty();

        let messages = this.state.messages.get(this.state.activeConversation.guid);

        if (messages == null) {
            return;
        }

        for (let message of messages) {
            this.renderMessage(message);
        }
    }

    public renderMessage(message: IMessage) {
        $(".messages").append("<div><div>" + message.text + "</div><div>" + message.isFromMe + "</div></div>");
    }
}

export { UI }