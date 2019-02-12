import { Schema, normalize, denormalize } from "normalizr";
import { IRootState, IStateAction, IEntityState, IStateItemData } from "./types";

// normalizeData
const normalizeData = (input: any, schema: Schema) => {
  const { result, entities } = normalize(input, schema);
  const nextEntities = Object.keys(entities).reduce((res: any, key: string) => {
    res[key] = {
      data: entities[key],
    };
    return res;
  }, {});

  return { result, entities: nextEntities };
};

// getAllEntitiesData
const getAllEntitiesData = (state: IRootState) => {
  return Object.keys(state).reduce((result: any, key: string) => {
    if (state[key]) {
      result[key] = state[key].data;
    }
    return result;
  }, {});
};

// normalizeStatus
export const normalizeStatus = (statekey: string, status: string = "loading"): IStateAction => {
  const [keyType, id] = statekey.split("/");
  return {
    type: `${statekey}/${status.toLocaleUpperCase()}`,
    entities: {
      [keyType]: {
        status: { [id]: status },
      },
    },
  };
};

// normalizeEntity
export const normalizeEntity = (
  statekey: string,
  schema: Schema | null = null,
  data?: any,
  status: string = "loaded"
): IStateAction => {
  const [keyType, id] = statekey.split("/");
  const type = `${statekey}/${status.toLocaleUpperCase()}`;

  let result = data;
  let entities = null;
  let action: any = {
    type,
    entities: {
      [keyType]: {
        status: { [id]: status },
      },
    },
  };

  if (schema && data) {
    const normalizeResult = normalizeData(data, schema);
    result = normalizeResult.result;
    entities = normalizeResult.entities;
  }

  if (entities) {
    action.entities = {
      ...action.entities,
      ...entities,
    };
  }

  action.entities[keyType].data = {};
  action.entities[keyType].data[id] = result;

  return action;
};

// normalizeError
export const normalizeError = (
  statekey: string,
  error: any,
  isGlobalError: boolean = true, // 是否显示为全局错误
  status: string = "error"
): IStateAction => {
  const [keyType, id] = statekey.split("/");
  return {
    type: `${statekey}/${status.toLocaleUpperCase()}`,
    error: isGlobalError ? error : null,
    entities: {
      [keyType]: {
        status: { [id]: status },
        errors: { [id]: error },
      },
    },
  };
};

// denormalizeStatus
export const denormalizeStatus = (statekey: string, state: IRootState): string => {
  const [keyType, id] = statekey.split("/");
  const entities = state[keyType];
  if (entities && entities.status && entities.status[id]) {
    return entities.status[id];
  }
  return "";
};

const EMPTY_OBJECT = {};

// denormalizeData
export const denormalizeData = <R = any>(
  statekey: string,
  schema: Schema | null,
  state: IRootState,
  defaultValue?: R
): R => {
  const [keyType, id] = statekey.split("/");
  const entities = state[keyType];

  if (entities && entities.data) {
    const input = entities.data[id];
    if (input) {
      if (schema) {
        const allEntitiesData = getAllEntitiesData(state);
        return denormalize(input, schema, allEntitiesData);
      } else {
        return input as R;
      }
    }
  }

  return defaultValue || (EMPTY_OBJECT as R);
};

// denormalizeError
export const denormalizeError = (statekey: string, state: IRootState): any => {
  const [keyType, id] = statekey.split("/");
  const entities = state[keyType];
  if (entities && entities.errors && entities.errors[id]) {
    return entities.errors[id];
  }

  return null;
};

// denormalizeEntity
export const denormalizeEntity = <R = any>(
  statekey: string,
  schema: Schema | null,
  state: IRootState,
  defaultValue?: R
): IEntityState<R> => {
  return {
    status: denormalizeStatus(statekey, state),
    data: denormalizeData<R>(statekey, schema, state, defaultValue),
    error: denormalizeError(statekey, state),
  };
};
