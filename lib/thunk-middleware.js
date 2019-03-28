"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalizr_helpers_1 = require("./normalizr-helpers");
var MethodType;
(function (MethodType) {
    MethodType["GET"] = "GET";
    MethodType["POST"] = "POST";
    MethodType["PUT"] = "PUT";
    MethodType["DELETE"] = "DELETE";
    MethodType["OPTIONS"] = "OPTIONS";
    MethodType["PATCH"] = "PATCH";
    MethodType["HEAD"] = "HEAD";
})(MethodType = exports.MethodType || (exports.MethodType = {}));
exports.ThunkActionType = "@@thunk";
exports.createThunkMiddleware = handle => store => next => (action) => {
    if (action.type !== exports.ThunkActionType || !action.payload) {
        return next(action);
    }
    const { url, method = MethodType.GET, stateKey, body, query, loadingStatus, loadedStatus, schema, globalError = true, data, payload, } = action.payload;
    if (url) {
        next(normalizr_helpers_1.normalizeStatus(stateKey, loadingStatus));
        return handle({ url, method, body, query })
            .then((res) => {
            let result = undefined;
            if (data) {
                const state = normalizr_helpers_1.denormalizeData(stateKey, schema || null, store.getState());
                result = data(res, state);
            }
            next(normalizr_helpers_1.normalizeEntity(stateKey, schema || null, result, loadedStatus));
            return res;
        })
            .catch((err) => {
            next(normalizr_helpers_1.normalizeError(stateKey, err, globalError));
            throw err;
        });
    }
    else {
        return next(normalizr_helpers_1.normalizeEntity(stateKey, null, payload, loadedStatus));
    }
};
exports.createThunk = (fn) => {
    return (...args) => {
        const payload = fn(...args);
        return { type: exports.ThunkActionType, payload };
    };
};
exports.createSelecter = (fn) => {
    return (state, ...args) => {
        const { stateKey, schema, default: defaultValue } = fn(...args);
        return normalizr_helpers_1.denormalizeEntity(stateKey, schema || null, state, defaultValue);
    };
};
