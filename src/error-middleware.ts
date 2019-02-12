import { Middleware } from "redux";
import { normalizeEntity } from "./normalizr-helpers";
import { createSelecter } from "./thunk-middleware";

export const createErrorMiddleware: (
  stateKey: string
) => Middleware = stateKey => store => next => action => {
  if (action.error) {
    next(normalizeEntity(stateKey, null, action.error, "normal"));
  }
  return next(action);
};

export const ErrorStateKey = "global/error";
export const errorMiddleware: Middleware = createErrorMiddleware(ErrorStateKey);
