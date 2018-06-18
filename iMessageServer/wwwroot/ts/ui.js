define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UI {
        constructor(state) {
            this.state = state;
        }
        // Conversations
        selectConversation(conversation) {
            if (conversation == null) {
                return;
            }
            // Clear all selected tags
            $(".conversation").removeClass("selected");
            $(".conversation#" + conversation.guid.replace(/;/g, "\\;").replace(/\+/g, "\\+")).addClass("selected");
        }
        registerConversationClick(funct) {
            $(".conversations").on("click", ".conversation", (event) => funct(event.target));
        }
        renderConversations() {
            for (let conversation of this.state.conversations) {
                this.renderConversation(conversation);
            }
            this.selectConversation(this.state.activeConversation);
        }
        renderConversation(conversation) {
            $(".conversations").append("<div class=\"conversation\" id=\""
                + conversation.guid + "\">" + conversation.user + "</div>");
        }
        // Messages
        renderMessages() {
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
        renderMessage(message) {
            $(".messages").append("<div><div>" + message.text + "</div><div>" + message.isFromMe + "</div></div>");
        }
        registerSendClick(funct) {
            $("#sendmessage").click(() => {
                var message = $("#message").val();
                funct(message);
            });
        }
    }
    exports.UI = UI;
});
