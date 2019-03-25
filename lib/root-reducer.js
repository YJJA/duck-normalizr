"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merge_state_1 = require("./merge-state");
// rootReducer
exports.rootReducer = (state = {}, action) => {
    const { entities } = action;
    if (entities) {
        return merge_state_1.mergeState(state, entities);
    }
    return state;
};
