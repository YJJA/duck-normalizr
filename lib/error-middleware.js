"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalizr_helpers_1 = require("./normalizr-helpers");
exports.createErrorMiddleware = stateKey => store => next => action => {
    if (action.error) {
        next(normalizr_helpers_1.normalizeEntity(stateKey, null, action.error, "normal"));
    }
    return next(action);
};
exports.ErrorStateKey = "global/error";
exports.errorMiddleware = exports.createErrorMiddleware(exports.ErrorStateKey);
