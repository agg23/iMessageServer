define(["require", "exports", "./controller.js", "./hub.js"], function (require, exports, controller_js_1, hub_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    $(document).ready(function () {
        var controller = new controller_js_1.Controller();
        var hub = new hub_js_1.Hub(controller);
        hub.connect();
        // Load Existing Conversations
        $.ajax({
            url: "/api/Conversations"
        }).done(function (data) {
            data.map(c => controller.addConversation(c));
        });
    });
});
