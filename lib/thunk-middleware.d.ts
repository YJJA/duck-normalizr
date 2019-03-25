import { Schema } from "normalizr";
import { Middleware, AnyAction, Dispatch } from "redux";
import { IRootState, IEntityState } from "./types";
export declare enum MethodType {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    OPTIONS = "OPTIONS",
    PATCH = "PATCH",
    HEAD = "HEAD"
}
export interface IRequestOption {
    method: MethodType;
    url: string;
    body?: object;
    query?: object | string;
}
interface RequestInitial extends IRequestOption {
    stateKey: string;
    loadingStatus?: string;
    loadedStatus?: string;
    schema?: Schema;
    globalError?: boolean;
    payload?: object;
    data?: (res: any, state: any) => object;
}
interface IThunkAction extends AnyAction {
    payload?: RequestInitial;
}
export declare const ThunkActionType = "@@thunk";
export declare const createThunkMiddleware: (handle: (init: IRequestOption) => Promise<any>) => Middleware<{}, IRootState, Dispatch<IThunkAction>>;
interface ICreateThunk {
    (fn: () => RequestInitial): () => IThunkAction;
    <T>(fn: (arg0: T) => RequestInitial): (arg0: T) => IThunkAction;
    <T0, T1>(fn: (arg0: T0, arg1: T1) => RequestInitial): (arg0: T0, arg1: T1) => IThunkAction;
    <T0, T1, T2>(fn: (arg0: T0, arg1: T1, arg2: T2) => RequestInitial): (arg0: T0, arg1: T1, arg2: T2) => IThunkAction;
    <T0, T1, T2, T3>(fn: (arg0: T0, arg1: T1, arg2: T2, arg3: T3) => RequestInitial): (arg0: T0, arg1: T1, arg2: T2, arg3: T3) => IThunkAction;
}
export declare const createThunk: ICreateThunk;
interface ICreateSelecterFnResult<R> {
    stateKey: string;
    schema?: Schema | null;
    default?: R;
}
interface ICreateSelecter {
    <R = any>(fn: () => ICreateSelecterFnResult<R>): (state: IRootState) => IEntityState<R>;
    <K0, R = any>(fn: (arg0: K0) => ICreateSelecterFnResult<R>): (state: IRootState, arg0: K0) => IEntityState<R>;
    <K0, K1, R = any>(fn: (arg0: K0, arg1: K1) => ICreateSelecterFnResult<R>): (state: IRootState, arg0: K0, arg1: K1) => IEntityState<R>;
    <K0, K1, K2, R = any>(fn: (arg0: K0, arg1: K1, arg2: K2) => ICreateSelecterFnResult<R>): (state: IRootState, arg0: K0, arg1: K1, arg2: K2) => IEntityState<R>;
    <K0, K1, K2, K3, R = any>(fn: (arg0: K0, arg1: K1, arg2: K2, arg3: K3) => ICreateSelecterFnResult<R>): (state: IRootState, arg0: K0, arg1: K1, arg2: K2, arg3: K3) => IEntityState<R>;
}
export declare const createSelecter: ICreateSelecter;
export {};
