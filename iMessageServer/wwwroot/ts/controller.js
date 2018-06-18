define(["require", "exports", "./ui.js", "./models/controllerstate.js"], function (require, exports, ui_js_1, controllerstate_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Controller {
        constructor() {
            this.state = new controllerstate_js_1.ControllerState();
            this.state.loadState();
            this.ui = new ui_js_1.UI(this.state);
            this.ui.registerConversationClick((element) => {
                var conversation = this.conversationFromGuid(element.id);
                if (conversation != null) {
                    this.setActiveConversation(conversation);
                }
            });
            this.ui.registerSendClick((input) => {
                this.sendMessage(input, this.state.activeConversation);
            });
            this.ui.renderConversations();
        }
        // Conversations
        conversationFromGuid(guid) {
            return this.state.conversations.find(c => c.guid === guid);
        }
        setActiveConversation(conversation) {
            if (this.state.activeConversation == conversation) {
                return;
            }
            this.state.activeConversation = conversation;
            // Select Conversation in UI
            this.ui.selectConversation(conversation);
            // Render Messages in selected Conversation
            this.ui.renderMessages();
        }
        addConversation(conversation) {
            if (this.conversationFromGuid(conversation.guid) != null) {
                return;
            }
            this.state.conversations.push(conversation);
            var messages = new Array();
            this.state.messages.set(conversation.guid, messages);
            this.state.saveState();
            this.ui.renderConversation(conversation);
        }
        // Messages
        addMessage(message) {
            var messages = this.state.messages.get(message.guid);
            if (messages == null) {
                messages = new Array();
                this.state.messages.set(message.guid, messages);
            }
            messages.push(message);
            this.state.saveState();
            if (this.state.activeConversation != null && message.guid === this.state.activeConversation.guid) {
                this.ui.renderMessage(message);
            }
        }
        sendMessage(text, conversation) {
            var message = { "text": text, "guid": conversation.guid, "isFromMe": true };
            this.sendMessageFunction(message);
        }
    }
    exports.Controller = Controller;
});
