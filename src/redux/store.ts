import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducer";
import saga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares: any[] = [sagaMiddleware];

const store = createStore(reducer, applyMiddleware(...middlewares));

sagaMiddleware.run(saga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
