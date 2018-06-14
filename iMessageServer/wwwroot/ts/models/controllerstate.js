define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ControllerState {
        constructor() {
            this.conversations = new Array();
            this.messages = new Map();
        }
        saveState() {
            console.log("Saving state");
            localStorage.setItem("conversations", JSON.stringify(this.conversations));
            localStorage.setItem("messages", this.strMapToJson(this.messages));
            var guid = this.activeConversation != null ? this.activeConversation.guid : null;
            localStorage.setItem("activeConversationGuid", guid);
        }
        loadState() {
            console.log("Loading application state");
            var loadedConversations = JSON.parse(localStorage.getItem("conversations"));
            var conversations = new Array();
            if (loadedConversations != null) {
                for (let conversation of loadedConversations) {
                    conversations.push(conversation);
                }
            }
            this.conversations = conversations;
            var loadedMessages = this.jsonToStrMap(localStorage.getItem("messages"));
            var messages = new Map();
            if (loadedMessages != null) {
                for (let guid of Array.from(loadedMessages.keys())) {
                    var loadedGuidMessages = loadedMessages.get(guid);
                    var guidMessages = new Array();
                    if (loadedGuidMessages == null) {
                        continue;
                    }
                    for (let message of loadedGuidMessages) {
                        guidMessages.push(message);
                    }
                    messages.set(guid, guidMessages);
                }
            }
            this.messages = messages;
            var guid = localStorage.getItem("activeConversationGuid");
            this.activeConversation = this.conversations.find(c => c.guid === guid);
        }
        strMapToObj(strMap) {
            let obj = Object.create(null);
            for (let [k, v] of strMap) {
                obj[k] = v;
            }
            return obj;
        }
        objToStrMap(obj) {
            if (obj == null) {
                return null;
            }
            let strMap = new Map();
            for (let k of Object.keys(obj)) {
                strMap.set(k, obj[k]);
            }
            return strMap;
        }
        strMapToJson(strMap) {
            return JSON.stringify(this.strMapToObj(strMap));
        }
        jsonToStrMap(jsonStr) {
            return this.objToStrMap(JSON.parse(jsonStr));
        }
    }
    exports.ControllerState = ControllerState;
});
