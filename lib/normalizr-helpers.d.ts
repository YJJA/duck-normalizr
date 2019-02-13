import { Schema } from "normalizr";
import { IRootState, IStateAction, IEntityState } from "./types";
export declare const normalizeStatus: (statekey: string, status?: string) => IStateAction;
export declare const normalizeEntity: (statekey: string, schema?: import("normalizr").schema.Array | import("normalizr").schema.Entity | import("normalizr").schema.Object | import("normalizr").schema.Union | import("normalizr").schema.Values | import("normalizr").schema.Array[] | import("normalizr").schema.Entity[] | import("normalizr").schema.Object[] | import("normalizr").schema.Union[] | import("normalizr").schema.Values[] | {
    [key: string]: import("normalizr").schema.Array | import("normalizr").schema.Entity | import("normalizr").schema.Object | import("normalizr").schema.Union | import("normalizr").schema.Values | import("normalizr").schema.Array[] | import("normalizr").schema.Entity[] | import("normalizr").schema.Object[] | import("normalizr").schema.Union[] | import("normalizr").schema.Values[] | any | Schema[];
} | null, data?: any, status?: string) => IStateAction;
export declare const normalizeError: (statekey: string, error: any, isGlobalError?: boolean, status?: string) => IStateAction;
export declare const denormalizeStatus: (statekey: string, state: IRootState) => string;
export declare const denormalizeData: <R = any>(statekey: string, schema: import("normalizr").schema.Array | import("normalizr").schema.Entity | import("normalizr").schema.Object | import("normalizr").schema.Union | import("normalizr").schema.Values | import("normalizr").schema.Array[] | import("normalizr").schema.Entity[] | import("normalizr").schema.Object[] | import("normalizr").schema.Union[] | import("normalizr").schema.Values[] | {
    [key: string]: import("normalizr").schema.Array | import("normalizr").schema.Entity | import("normalizr").schema.Object | import("normalizr").schema.Union | import("normalizr").schema.Values | import("normalizr").schema.Array[] | import("normalizr").schema.Entity[] | import("normalizr").schema.Object[] | import("normalizr").schema.Union[] | import("normalizr").schema.Values[] | any | Schema[];
} | null, state: IRootState, defaultValue?: R | undefined) => R;
export declare const denormalizeError: (statekey: string, state: IRootState) => any;
export declare const denormalizeEntity: <R = any>(statekey: string, schema: import("normalizr").schema.Array | import("normalizr").schema.Entity | import("normalizr").schema.Object | import("normalizr").schema.Union | import("normalizr").schema.Values | import("normalizr").schema.Array[] | import("normalizr").schema.Entity[] | import("normalizr").schema.Object[] | import("normalizr").schema.Union[] | import("normalizr").schema.Values[] | {
    [key: string]: import("normalizr").schema.Array | import("normalizr").schema.Entity | import("normalizr").schema.Object | import("normalizr").schema.Union | import("normalizr").schema.Values | import("normalizr").schema.Array[] | import("normalizr").schema.Entity[] | import("normalizr").schema.Object[] | import("normalizr").schema.Union[] | import("normalizr").schema.Values[] | any | Schema[];
} | null, state: IRootState, defaultValue?: R | undefined) => IEntityState<R>;