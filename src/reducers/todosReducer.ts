import {ADD_TODO_ACTION, MARK_AS_DONE_TODO_ACTION} from "../actions/todosActions";
import {initialState} from "../model/InitialState";

export const todos = (state = initialState.todos, action) => {
    switch (action.type) {
        case ADD_TODO_ACTION: {
            return action.todos;
        }
        case MARK_AS_DONE_TODO_ACTION: {
            const todoIndex = state.findIndex(todo => todo.id === action.id);
            const newTodo = Object.assign(state[todoIndex], {done: true});

            return immutableSplice(state, todoIndex, 1, newTodo);
        }
        default:
            return state;
    }
};

const immutableSplice = (arr: any[], start: number, deleteCount: number, item: any) => {
    return [ ...arr.slice(0, start), item, ...arr.slice(start + deleteCount) ]
}