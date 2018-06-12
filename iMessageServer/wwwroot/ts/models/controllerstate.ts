import { IConversation } from "./conversation";
import { IMessage } from "./message";

class ControllerState {
    public conversations: Array<IConversation> = new Array<IConversation>();
    public messages: Map<string, Array<IMessage>> = new Map<string, Array<IMessage>>();

    public activeConversation: IConversation;
}

export { ControllerState }