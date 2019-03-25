import { mergeState } from "./merge-state";
import { IStateAction, IRootState } from "./types";

// rootReducer
export const rootReducer = (state: IRootState = {}, action: IStateAction): IRootState => {
  const { entities } = action;

  if (entities) {
    return mergeState(state, entities);
  }

  return state;
};
