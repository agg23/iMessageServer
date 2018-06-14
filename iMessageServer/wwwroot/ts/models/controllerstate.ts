import { IConversation } from "./conversation";
import { IMessage } from "./message";

class ControllerState {
    public conversations: Array<IConversation> = new Array<IConversation>();
    public messages: Map<string, Array<IMessage>> = new Map<string, Array<IMessage>>();

    public activeConversation: IConversation;

    public saveState() {
        console.log("Saving state");

        localStorage.setItem("conversations", JSON.stringify(this.conversations));
        localStorage.setItem("messages", this.strMapToJson(this.messages));

        var guid = this.activeConversation != null ? this.activeConversation.guid : null;
        localStorage.setItem("activeConversationGuid", guid);
    }

    public loadState() {
        console.log("Loading application state");

        var loadedConversations: Array<IConversation> = JSON.parse(localStorage.getItem("conversations"));
        var conversations = new Array<IConversation>();

        if (loadedConversations != null) {
            for (let conversation of loadedConversations) {
                conversations.push(conversation);
            }
        }

        this.conversations = conversations;

        var loadedMessages = this.jsonToStrMap(localStorage.getItem("messages"));
        var messages = new Map<string, Array<IMessage>>();

        if (loadedMessages != null) {
            for (let guid of Array.from(loadedMessages.keys())) {
                var loadedGuidMessages = loadedMessages.get(guid);

                var guidMessages = new Array<IMessage>();
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

    private strMapToObj(strMap: Map<string, any>): Object {
        let obj = Object.create(null);
        for (let [k, v] of strMap) {
            obj[k] = v;
        }

        return obj;
    }

    private objToStrMap(obj: Object): Map<string, any> {
        if (obj == null) {
            return null;
        }

        let strMap = new Map();
        for (let k of Object.keys(obj)) {
            strMap.set(k, obj[k]);
        }

        return strMap;
    }

    private strMapToJson(strMap: Map<string, any>): string {
        return JSON.stringify(this.strMapToObj(strMap));
    }

    private jsonToStrMap(jsonStr: string): Map<string, any> {
        return this.objToStrMap(JSON.parse(jsonStr));
    }
}

export { ControllerState }