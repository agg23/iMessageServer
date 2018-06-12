define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ControllerState {
        constructor() {
            this.conversations = new Array();
            this.messages = new Map();
        }
        saveState() {
            localStorage.setItem("conversations", JSON.stringify(this.conversations));
            localStorage.setItem("messages", JSON.stringify(this.messages));
            var guid = this.activeConversation != null ? this.activeConversation.guid : null;
            localStorage.setItem("activeConversationGuid", guid);
        }
        loadState() {
            console.log("Loading application state");
            var loadedConversations = JSON.parse(localStorage.getItem("conversations"));
            var conversations = new Array();
            for (let conversation of loadedConversations) {
                conversations.push(conversation);
            }
            if (conversations instanceof Array) {
                console.log("Conversation cast failed");
            }
            this.conversations = conversations;
            var loadedMessages = JSON.parse(localStorage.getItem("messages"));
            var messages = new Map();
            for (let guid in loadedMessages) {
                var loadedGuidMessages = loadedMessages[guid];
                var guidMessages = new Array();
                for (let message of loadedGuidMessages) {
                    guidMessages.push(message);
                }
                messages.set(guid, guidMessages);
            }
            if (messages instanceof Map) {
                console.log("Messages cast failed");
            }
            this.messages = messages;
            var guid = localStorage.getItem("activeConversationGuid");
            this.activeConversation = this.conversations.find(c => c.guid === guid);
        }
    }
    exports.ControllerState = ControllerState;
});
