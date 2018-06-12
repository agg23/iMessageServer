define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UI {
        constructor(state) {
            this.state = state;
        }
        registerConversationClick(funct) {
            $(".conversations").on("click", ".conversation", funct);
        }
        renderConversation(conversation) {
            $(".conversations").append("<div class=\"conversation\" id=\""
                + conversation.guid + "\">" + conversation.user + "</div>");
        }
        renderMessages() {
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
        renderMessage(message) {
            $(".messages").append("<div><div>" + message.text + "</div><div>" + message.isFromMe + "</div></div>");
        }
    }
    exports.UI = UI;
});
