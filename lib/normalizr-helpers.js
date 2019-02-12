"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalizr_1 = require("normalizr");
// normalizeData
const normalizeData = (input, schema) => {
    const { result, entities } = normalizr_1.normalize(input, schema);
    const nextEntities = Object.keys(entities).reduce((res, key) => {
        res[key] = {
            data: entities[key],
        };
        return res;
    }, {});
    return { result, entities: nextEntities };
};
// getAllEntitiesData
const getAllEntitiesData = (state) => {
    return Object.keys(state).reduce((result, key) => {
        if (state[key]) {
            result[key] = state[key].data;
        }
        return result;
    }, {});
};
// normalizeStatus
exports.normalizeStatus = (statekey, status = "loading") => {
    const [keyType, id] = statekey.split("/");
    return {
        type: `${statekey}/${status.toLocaleUpperCase()}`,
        entities: {
            [keyType]: {
                status: { [id]: status },
            },
        },
    };
};
// normalizeEntity
exports.normalizeEntity = (statekey, schema = null, data, status = "loaded") => {
    const [keyType, id] = statekey.split("/");
    const type = `${statekey}/${status.toLocaleUpperCase()}`;
    let result = data;
    let entities = null;
    let action = {
        type,
        entities: {
            [keyType]: {
                status: { [id]: status },
            },
        },
    };
    if (schema && data) {
        const normalizeResult = normalizeData(data, schema);
        result = normalizeResult.result;
        entities = normalizeResult.entities;
    }
    if (entities) {
        action.entities = Object.assign({}, action.entities, entities);
    }
    action.entities[keyType].data = {};
    action.entities[keyType].data[id] = result;
    return action;
};
// normalizeError
exports.normalizeError = (statekey, error, isGlobalError = true, // 是否显示为全局错误
status = "error") => {
    const [keyType, id] = statekey.split("/");
    return {
        type: `${statekey}/${status.toLocaleUpperCase()}`,
        error: isGlobalError ? error : null,
        entities: {
            [keyType]: {
                status: { [id]: status },
                errors: { [id]: error },
            },
        },
    };
};
// denormalizeStatus
exports.denormalizeStatus = (statekey, state) => {
    const [keyType, id] = statekey.split("/");
    const entities = state[keyType];
    if (entities && entities.status && entities.status[id]) {
        return entities.status[id];
    }
    return "";
};
const EMPTY_OBJECT = {};
// denormalizeData
exports.denormalizeData = (statekey, schema, state, defaultValue) => {
    const [keyType, id] = statekey.split("/");
    const entities = state[keyType];
    if (entities && entities.data) {
        const input = entities.data[id];
        if (input) {
            if (schema) {
                const allEntitiesData = getAllEntitiesData(state);
                return normalizr_1.denormalize(input, schema, allEntitiesData);
            }
            else {
                return input;
            }
        }
    }
    return defaultValue || EMPTY_OBJECT;
};
// denormalizeError
exports.denormalizeError = (statekey, state) => {
    const [keyType, id] = statekey.split("/");
    const entities = state[keyType];
    if (entities && entities.errors && entities.errors[id]) {
        return entities.errors[id];
    }
    return null;
};
// denormalizeEntity
exports.denormalizeEntity = (statekey, schema, state, defaultValue) => {
    return {
        status: exports.denormalizeStatus(statekey, state),
        data: exports.denormalizeData(statekey, schema, state, defaultValue),
        error: exports.denormalizeError(statekey, state),
    };
};
