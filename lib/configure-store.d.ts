import { Middleware } from "redux";
export declare function createConfigureStore(middlewares?: Middleware[]): (initialState?: any) => import("redux").Store<import("./types").IRootState, import("./types").IStateAction> & {
    dispatch: {};
};
