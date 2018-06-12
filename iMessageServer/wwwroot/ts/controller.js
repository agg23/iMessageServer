define(["require", "exports", "./ui.js", "./models/controllerstate.js"], function (require, exports, ui_js_1, controllerstate_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Controller {
        constructor() {
            this.state = new controllerstate_js_1.ControllerState();
            this.ui = new ui_js_1.UI(this.state);
            console.log("Registering click");
            this.ui.registerConversationClick((element) => {
                console.log(element);
            });
        }
        // Conversations
        //public setActiveConversation(conversation: IConversation) {
        //    this.activeConversation = conversation;
        //}
        addConversation(conversation) {
            if (this.state.conversations.find(c => c.guid === conversation.guid) != null) {
                return;
            }
            this.state.conversations.push(conversation);
            var messages = new Array();
            this.state.messages.set(conversation.guid, messages);
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
            if (this.state.activeConversation != null && message.guid === this.state.activeConversation.guid) {
                this.ui.renderMessage(message);
            }
        }
    }
    exports.Controller = Controller;
});
