import {put, select} from "redux-saga/effects";
import {addTodoAction, ISaveTodoAction} from "./actions/todosActions";
import {IItem, ITodo, IType} from "./model/Todo";
import {addTypesAction} from "./actions/typesActions";
import {switchContentAction} from "./actions/contentActions";
import {EContent, IState} from "./model/InitialState";

const getData = (url: string) => fetch(url).then(response => response.json());

export function* initializeSaga() {
    const items: IItem[] = yield getData('http://rygorh.dev.monterosa.co.uk/todo/items.php');
    const types: IType[] = yield getData('http://rygorh.dev.monterosa.co.uk/todo/types.php');

    const typedItems: ITodo[] = items
        .map(item => {
            item.expires_at *= 1000;
            item.created_at *= 1000;

            return createTodoByItem(item, types)
        })
        .sort((prev, next) => prev.expires_at - next.expires_at);

    yield put(addTodoAction(typedItems));
    yield put(addTypesAction(types));
}

export function* saveTodoSaga(action: ISaveTodoAction) {
    const types = yield select((state: IState) => state.types);
    const todo = createTodoByItem(action.item, types);
    const todos = yield select((state: IState) => state.todos);

    const newTodos = [...todos, todo].sort((prev, next) => prev.expires_at - next.expires_at);

    yield put(addTodoAction(newTodos));
    yield put(switchContentAction(EContent.todos));
}

export const generateTodoId = (item: IItem) => {
    return JSON.stringify(item);
};

const createTodoByItem = (item, types) => {
    const type = types.find(type => type.id === item.type);

    if (undefined === type) {
        throw new Error(`Type with id ${item.type} not found type list`);
    }

    return Object.assign(item, {
        type_name: type.name,
        id: generateTodoId(item),
    });
};