"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const redux_react_hook_1 = require("redux-react-hook");
exports.useSelecter = (mapStateCreater, ...args) => {
    const mapState = react_1.useCallback((state) => {
        return mapStateCreater(state, ...args);
    }, [...args]);
    return redux_react_hook_1.useMappedState(mapState);
};
exports.useThunk = (thunkAction, ...args) => {
    const dispatch = redux_react_hook_1.useDispatch();
    const callback = react_1.useCallback((...props) => {
        return dispatch(thunkAction(...args, ...props));
    }, [...args]);
    return callback;
};
