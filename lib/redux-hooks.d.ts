import { AnyAction } from "redux";
import { IRootState } from "./types";
export interface IUseSelecter {
    <R>(sc: (state: IRootState) => R): R;
    <R, K0>(sc: (state: IRootState, arg0: K0) => R, arg0: K0): R;
    <R, K0, K1>(sc: (state: IRootState, arg0: K0, arg1: K1) => R, arg0: K0, arg1: K1): R;
    <R, K0, K1, K2>(sc: (state: IRootState, arg0: K0, arg1: K1, arg2: K2) => R, arg0: K0, arg1: K1, arg2: K2): R;
    <R, K0, K1, K2, K3>(sc: (state: IRootState, arg0: K0, arg1: K1, arg2: K2, arg3: K3) => R, arg0: K0, arg1: K1, arg2: K2, arg3: K3): R;
}
export declare const useSelecter: IUseSelecter;
export interface IUseThunk {
    <R>(thunk: () => AnyAction): () => R;
    <R, K0>(thunk: (arg0: K0) => AnyAction): (arg0: K0) => R;
    <R, K0>(thunk: (arg0: K0) => AnyAction, arg0: K0): () => R;
    <R, K0, K1>(thunk: (arg0: K0, arg1: K1) => AnyAction): (arg0: K0, arg1: K1) => R;
    <R, K0, K1>(thunk: (arg0: K0, arg1: K1) => AnyAction, arg0: K0): (arg1: K1) => R;
    <R, K0, K1>(thunk: (arg0: K0, arg1: K1) => AnyAction, arg0: K0, arg1: K1): () => R;
    <R, K0, K1, K2>(thunk: (arg0: K0, arg1: K1, arg2: K2) => AnyAction): (arg0: K0, arg1: K1, arg2: K2) => R;
    <R, K0, K1, K2>(thunk: (arg0: K0, arg1: K1, arg2: K2) => AnyAction, arg0: K0): (arg1: K1, arg2: K2) => R;
    <R, K0, K1, K2>(thunk: (arg0: K0, arg1: K1, arg2: K2) => AnyAction, arg0: K0, arg1: K1): (arg2: K2) => R;
    <R, K0, K1, K2>(thunk: (arg0: K0, arg1: K1, arg2: K2) => AnyAction, arg0: K0, arg1: K1, arg2: K2): () => R;
    <R, K0, K1, K2, K3>(thunk: (arg0: K0, arg1: K1, arg2: K2) => AnyAction): (arg0: K0, arg1: K1, arg2: K2, arg3: K3) => R;
    <R, K0, K1, K2, K3>(thunk: (arg0: K0, arg1: K1, arg2: K2) => AnyAction, arg0: K0): (arg1: K1, arg2: K2, arg3: K3) => R;
    <R, K0, K1, K2, K3>(thunk: (arg0: K0, arg1: K1, arg2: K2) => AnyAction, arg0: K0, arg1: K1): (arg2: K2, arg3: K3) => R;
    <R, K0, K1, K2, K3>(thunk: (arg0: K0, arg1: K1, arg2: K2) => AnyAction, arg0: K0, arg1: K1, arg2: K2): (arg3: K3) => R;
    <R, K0, K1, K2, K3>(thunk: (arg0: K0, arg1: K1, arg2: K2) => AnyAction, arg0: K0, arg1: K1, arg2: K2, arg3: K3): () => R;
}
export declare const useThunk: IUseThunk;
