define(["require", "exports", "./hub.js"], function (require, exports, hub_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var hub = new hub_js_1.Hub();
    hub.connect();
});
