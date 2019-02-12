"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 合并对象数据
 * @param changes 变更的数据
 * @param state 原有的数据
 */
const mergeStateObject = (changes, state) => {
    if (!changes || !state) {
        return changes || state;
    }
    return Object.assign({}, state, changes);
};
/**
 * 数据合并，如果changeData[key]是 undefined 则直接返回原数据
 * 如果 changeData[key] 是 null 则返回 null
 * 如果 changeData[key] 是 一个对象，则合并对象
 */
const mergeStateData = (changes, state) => {
    if (!changes || !state) {
        return changes || state;
    }
    return Object.keys(changes).reduce((result, key) => {
        // disabled ts
        const changeItem = changes[key];
        const stateItem = state[key];
        if (typeof changeItem === "undefined") {
            result[key] = stateItem;
        }
        else if (changeItem === null) {
            result[key] = changeItem;
        }
        else {
            result[key] = Object.assign({}, changes[key], state[key]);
        }
        return result;
    }, Object.assign({}, state));
};
const mergeStateItem = (changes, state) => {
    if (!state) {
        return changes;
    }
    return {
        data: mergeStateData(changes.data, state.data),
        status: mergeStateObject(changes.status, state.status),
        errors: mergeStateObject(changes.errors, state.errors),
    };
};
exports.mergeState = (state, changes) => {
    if (!changes) {
        return state;
    }
    return Object.keys(changes).reduce((result, key) => {
        result[key] = mergeStateItem(changes[key], state[key]);
        return result;
    }, Object.assign({}, state));
};
