define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ControllerState {
        constructor() {
            this.conversations = new Array();
            this.messages = new Map();
        }
    }
    exports.ControllerState = ControllerState;
});
