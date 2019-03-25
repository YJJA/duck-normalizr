import { AnyAction } from "redux";
export interface IStateItemProps<P = any> {
    [key: string]: P;
}
export declare type IStateItemData = {
    [key: string]: any;
} | null | undefined;
export interface IStateItem {
    status?: IStateItemProps<string>;
    data?: IStateItemProps<IStateItemData>;
    errors?: IStateItemProps<any>;
}
export interface IRootState {
    [entityName: string]: IStateItem;
}
export interface IStateAction extends AnyAction {
    changes?: IRootState;
}
export interface IEntityState<D = any> {
    status: string;
    data: D;
    error: any;
}
