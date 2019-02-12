import { createStore, applyMiddleware, Middleware } from "redux";
import { rootReducer } from "./root-reducer";

export function createConfigureStore(middlewares: Middleware[] = []) {
  return (initialState?: any) => {
    return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
  };
}
