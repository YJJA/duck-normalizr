import superagent, { Response } from "superagent";

import { createConfigureStore } from "../configure-store";

import { createThunkMiddleware, IRequestOption } from "../thunk-middleware";
import { errorMiddleware } from "../error-middleware";

const thunkMiddleware = createThunkMiddleware(({ url, method, query, body }: IRequestOption) => {
  const request = superagent(method.toLocaleLowerCase(), url);
  if (query) {
    request.query(query);
  }
  if (body) {
    request.send(body);
  }
  return request.then((res: Response) => {
    if (!res.body) {
      try {
        res.body = JSON.parse(res.text);
      } catch (e) {}
    }

    if (!res.body && res.header.token) {
      res.body = {
        token: res.header.token,
      };
      return res;
    } else if (res.body && (res.body.code === 1000 || typeof res.body.code === "undefined")) {
      return res;
    } else {
      throw res;
    }
  });
});

const configureStore = createConfigureStore([thunkMiddleware, errorMiddleware]);

const store = configureStore();

const state = store.getState();
