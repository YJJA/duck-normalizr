import { mergeState } from "./merge-state";
import { IStateAction, IRootState } from "./types";

// rootReducer
export const rootReducer = (state: IRootState = {}, action: IStateAction): IRootState => {
  const { changes } = action;

  if (changes) {
    return mergeState(state, changes);
  }

  return state;
};
