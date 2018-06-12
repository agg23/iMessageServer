import { Controller } from "./controller.js"
import { Hub } from "./hub.js"
import { IConversation } from "./models/conversation.js";

$(document).ready(function () {
    var controller = new Controller();

    var hub = new Hub(controller);
    hub.connect();

    // Load Existing Conversations
    $.ajax({
        url: "/api/Conversations"
    }).done(function (data: Array<IConversation>) {
        data.map(c => controller.addConversation(c));
    });
});