import { IConversation } from "./conversation";

export interface IMessage {
    guid: string;
    text: string;
    isFromMe: boolean;
}