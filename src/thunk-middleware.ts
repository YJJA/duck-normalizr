import {Schema} from "normalizr";
import {Middleware, AnyAction, Dispatch} from "redux";
import {
  normalizeStatus,
  normalizeEntity,
  normalizeError,
  denormalizeEntity,
  denormalizeData,
} from "./normalizr-helpers";
import {IRootState, IEntityState} from "./types";

export enum MethodType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
  HEAD = "HEAD",
}

export interface IRequestOption {
  method: MethodType;
  url: string;
  body?: object;
  query?: object | string;
  data?: (res: any, state: any) => object;
}

interface RequestInitial extends Partial<IRequestOption> {
  stateKey: string;
  loadingStatus?: string;
  loadedStatus?: string;
  schema?: Schema;
  globalError?: boolean;
  payload?: object;
}

interface IThunkAction extends AnyAction {
  payload?: RequestInitial;
}

export const ThunkActionType = "@@thunk";

export const createThunkMiddleware: (
  handle: (init: IRequestOption) => Promise<any>
) => Middleware<{}, IRootState, Dispatch<IThunkAction>> = handle => store => next => (
  action: IThunkAction
) => {
  if (action.type !== ThunkActionType || !action.payload) {
    return next(action);
  }

  const {
    url,
    method = MethodType.GET,
    stateKey,
    body,
    query,
    loadingStatus,
    loadedStatus,
    schema,
    globalError = true,
    data,
    payload,
  } = action.payload;

  if (url) {
    next(normalizeStatus(stateKey, loadingStatus));
    return handle({url, method, body, query})
      .then((res: any) => {
        let result = undefined;
        if (data) {
          const state = denormalizeData(stateKey, schema || null, store.getState());
          result = data(res, state);
        }
        next(normalizeEntity(stateKey, schema || null, result, loadedStatus));
        return res;
      })
      .catch((err: any) => {
        next(normalizeError(stateKey, err, globalError));
        throw err;
      });
  } else {
    return next(normalizeEntity(stateKey, null, payload, loadedStatus));
  }
};

interface ICreateThunk {
  (fn: () => RequestInitial): () => IThunkAction;
  <T>(fn: (arg0: T) => RequestInitial): (arg0: T) => IThunkAction;
  <T0, T1>(fn: (arg0: T0, arg1: T1) => RequestInitial): (arg0: T0, arg1: T1) => IThunkAction;
  <T0, T1, T2>(fn: (arg0: T0, arg1: T1, arg2: T2) => RequestInitial): (
    arg0: T0,
    arg1: T1,
    arg2: T2
  ) => IThunkAction;
  <T0, T1, T2, T3>(fn: (arg0: T0, arg1: T1, arg2: T2, arg3: T3) => RequestInitial): (
    arg0: T0,
    arg1: T1,
    arg2: T2,
    arg3: T3
  ) => IThunkAction;
}

export const createThunk: ICreateThunk = (fn: any) => {
  return (...args: any[]) => {
    const payload = fn(...args);
    return {type: ThunkActionType, payload};
  };
};

// createStateSelecter
interface ICreateSelecterFnResult<R> {
  stateKey: string;
  schema?: Schema | null;
  default?: R;
}

interface ICreateSelecter {
  <R = any>(fn: () => ICreateSelecterFnResult<R>): (state: IRootState) => IEntityState<R>;
  <K0, R = any>(fn: (arg0: K0) => ICreateSelecterFnResult<R>): (
    state: IRootState,
    arg0: K0
  ) => IEntityState<R>;
  <K0, K1, R = any>(fn: (arg0: K0, arg1: K1) => ICreateSelecterFnResult<R>): (
    state: IRootState,
    arg0: K0,
    arg1: K1
  ) => IEntityState<R>;
  <K0, K1, K2, R = any>(fn: (arg0: K0, arg1: K1, arg2: K2) => ICreateSelecterFnResult<R>): (
    state: IRootState,
    arg0: K0,
    arg1: K1,
    arg2: K2
  ) => IEntityState<R>;
  <K0, K1, K2, K3, R = any>(
    fn: (arg0: K0, arg1: K1, arg2: K2, arg3: K3) => ICreateSelecterFnResult<R>
  ): (state: IRootState, arg0: K0, arg1: K1, arg2: K2, arg3: K3) => IEntityState<R>;
}

export const createSelecter: ICreateSelecter = (fn: any) => {
  return (state: IRootState, ...args: any) => {
    const {stateKey, schema, default: defaultValue} = fn(...args);
    return denormalizeEntity(stateKey, schema || null, state, defaultValue);
  };
};
