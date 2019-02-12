import { IRootState, IStateItem, IStateItemProps, IStateItemData } from "./types";

/**
 * 合并对象数据
 * @param changes 变更的数据
 * @param state 原有的数据
 */
const mergeStateObject = <T extends IStateItemProps<any>>(changes?: T, state?: T) => {
  if (!changes || !state) {
    return changes || state;
  }

  return { ...state, ...changes };
};

/**
 * 数据合并，如果changeData[key]是 undefined 则直接返回原数据
 * 如果 changeData[key] 是 null 则返回 null
 * 如果 changeData[key] 是 一个对象，则合并对象
 */
const mergeStateData = <T extends IStateItemProps<any>>(changes?: T, state?: T) => {
  if (!changes || !state) {
    return changes || state;
  }

  return Object.keys(changes).reduce<T>(
    (result, key) => {
      // disabled ts
      const changeItem = changes[key];
      const stateItem = state[key];

      if (typeof changeItem === "undefined") {
        result[key] = stateItem;
      } else if (changeItem === null) {
        result[key] = changeItem;
      } else {
        result[key] = { ...changes[key], ...state[key] };
      }

      return result;
    },
    { ...state }
  );
};

const mergeStateItem = (changes: IStateItem, state?: IStateItem): IStateItem => {
  if (!state) {
    return changes;
  }

  return {
    data: mergeStateData<IStateItemProps<IStateItemData>>(changes.data, state.data),
    status: mergeStateObject<IStateItemProps<string>>(changes.status, state.status),
    errors: mergeStateObject<IStateItemProps<any>>(changes.errors, state.errors),
  };
};

export const mergeState = (state: IRootState, changes?: IRootState): IRootState => {
  if (!changes) {
    return state;
  }

  return Object.keys(changes).reduce(
    (result, key) => {
      result[key] = mergeStateItem(changes[key], state[key]);
      return result;
    },
    { ...state }
  );
};
