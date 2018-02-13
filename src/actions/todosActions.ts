import {IItem, ITodo} from "../model/Todo";

export const ADD_TODO_ACTION = 'ADD_TODO_ACTION';
export const addTodoAction = (todos: ITodo[]) => ({
    type: ADD_TODO_ACTION,
    todos
});

export const MARK_AS_DONE_TODO_ACTION = 'MARK_AS_DONE_TODO_ACTION';
export const markAsDoneTodoAction = (id: string) => ({
    type:MARK_AS_DONE_TODO_ACTION,
    id
});

export interface ISaveTodoAction {
    type: string,
    item: IItem
}
export const SAVE_TODO_ACTION = 'SAVE_TODO_ACTION';
export const saveTodoAction = (item: IItem) => ({
    type:SAVE_TODO_ACTION,
    item
});