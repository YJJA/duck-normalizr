"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const root_reducer_1 = require("./root-reducer");
function createConfigureStore(middlewares = []) {
    return (initialState) => {
        return redux_1.createStore(root_reducer_1.rootReducer, initialState, redux_1.applyMiddleware(...middlewares));
    };
}
exports.createConfigureStore = createConfigureStore;
