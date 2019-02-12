import { useCallback } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";
import { AnyAction } from "redux";
import { IRootState } from "./types";

// useSelecter

export interface IUseSelecter {
  <R>(sc: (state: IRootState) => R): R;
  <R, K0>(sc: (state: IRootState, arg0: K0) => R, arg0: K0): R;
  <R, K0, K1>(sc: (state: IRootState, arg0: K0, arg1: K1) => R, arg0: K0, arg1: K1): R;
  <R, K0, K1, K2>(
    sc: (state: IRootState, arg0: K0, arg1: K1, arg2: K2) => R,
    arg0: K0,
    arg1: K1,
    arg2: K2
  ): R;
  <R, K0, K1, K2, K3>(
    sc: (state: IRootState, arg0: K0, arg1: K1, arg2: K2, arg3: K3) => R,
    arg0: K0,
    arg1: K1,
    arg2: K2,
    arg3: K3
  ): R;
}

export const useSelecter: IUseSelecter = (mapStateCreater: any, ...args: any[]) => {
  const mapState = useCallback(
    (state: IRootState) => {
      return mapStateCreater(state, ...args);
    },
    [...args]
  );
  return useMappedState(mapState);
};

// useThunk

export interface IUseThunk {
  <R>(thunk: () => AnyAction): () => R;
  <R, K0>(thunk: (arg0: K0) => AnyAction): (arg0: K0) => R;
  <R, K0>(thunk: (arg0: K0) => AnyAction, arg0: K0): () => R;
  <R, K0, K1>(thunk: (arg0: K0, arg1: K1) => AnyAction): (arg0: K0, arg1: K1) => R;
  <R, K0, K1>(thunk: (arg0: K0, arg1: K1) => AnyAction, arg0: K0): (arg1: K1) => R;
  <R, K0, K1>(thunk: (arg0: K0, arg1: K1) => AnyAction, arg0: K0, arg1: K1): () => R;
  <R, K0, K1, K2>(thunk: (arg0: K0, arg1: K1, arg2: K2) => AnyAction): (
    arg0: K0,
    arg1: K1,
    arg2: K2
  ) => R;
  <R, K0, K1, K2>(thunk: (arg0: K0, arg1: K1, arg2: K2) => AnyAction, arg0: K0): (
    arg1: K1,
    arg2: K2
  ) => R;
  <R, K0, K1, K2>(thunk: (arg0: K0, arg1: K1, arg2: K2) => AnyAction, arg0: K0, arg1: K1): (
    arg2: K2
  ) => R;
  <R, K0, K1, K2>(
    thunk: (arg0: K0, arg1: K1, arg2: K2) => AnyAction,
    arg0: K0,
    arg1: K1,
    arg2: K2
  ): () => R;
  <R, K0, K1, K2, K3>(thunk: (arg0: K0, arg1: K1, arg2: K2) => AnyAction): (
    arg0: K0,
    arg1: K1,
    arg2: K2,
    arg3: K3
  ) => R;
  <R, K0, K1, K2, K3>(thunk: (arg0: K0, arg1: K1, arg2: K2) => AnyAction, arg0: K0): (
    arg1: K1,
    arg2: K2,
    arg3: K3
  ) => R;
  <R, K0, K1, K2, K3>(thunk: (arg0: K0, arg1: K1, arg2: K2) => AnyAction, arg0: K0, arg1: K1): (
    arg2: K2,
    arg3: K3
  ) => R;
  <R, K0, K1, K2, K3>(
    thunk: (arg0: K0, arg1: K1, arg2: K2) => AnyAction,
    arg0: K0,
    arg1: K1,
    arg2: K2
  ): (arg3: K3) => R;
  <R, K0, K1, K2, K3>(
    thunk: (arg0: K0, arg1: K1, arg2: K2) => AnyAction,
    arg0: K0,
    arg1: K1,
    arg2: K2,
    arg3: K3
  ): () => R;
}
export const useThunk: IUseThunk = (thunkAction: any, ...args: any[]) => {
  const dispatch = useDispatch();
  const callback = useCallback(
    (...props) => {
      return dispatch(thunkAction(...args, ...props));
    },
    [...args]
  );
  return callback;
};
