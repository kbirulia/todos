import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {todos} from "./reducers/todosReducer";
import createSagaMiddleware from "redux-saga";
import {initializeSaga, saveTodoSaga} from "./sagas";
import {initialState} from "./model/InitialState";
import {types} from "./reducers/typesReducer";
import {content} from "./reducers/contentReducer";
import {fork, takeEvery} from "redux-saga/effects";
import {SAVE_TODO_ACTION} from "./actions/todosActions";

const composeEnhancers =
    process.env.NODE_ENV === 'development' &&
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware),
);

const combinedReducer = combineReducers({
    todos,
    types,
    content
});

export const store = createStore(
    combinedReducer,
    initialState,
    enhancer
);

sagaMiddleware.run(function*(){
    yield fork(initializeSaga);
    yield takeEvery(SAVE_TODO_ACTION, saveTodoSaga);
});