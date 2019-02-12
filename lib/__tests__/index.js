"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = __importDefault(require("superagent"));
const configure_store_1 = require("../configure-store");
const thunk_middleware_1 = require("../thunk-middleware");
const error_middleware_1 = require("../error-middleware");
const thunkMiddleware = thunk_middleware_1.createThunkMiddleware(({ url, method, query, body }) => {
    const request = superagent_1.default(method.toLocaleLowerCase(), url);
    if (query) {
        request.query(query);
    }
    if (body) {
        request.send(body);
    }
    return request.then((res) => {
        if (!res.body) {
            try {
                res.body = JSON.parse(res.text);
            }
            catch (e) { }
        }
        if (!res.body && res.header.token) {
            res.body = {
                token: res.header.token,
            };
            return res;
        }
        else if (res.body && (res.body.code === 1000 || typeof res.body.code === "undefined")) {
            return res;
        }
        else {
            throw res;
        }
    });
});
const configureStore = configure_store_1.createConfigureStore([thunkMiddleware, error_middleware_1.errorMiddleware]);
const store = configureStore();
const state = store.getState();
