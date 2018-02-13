import {ITodo, IType} from "./Todo";

export enum EContent {
    form,
    todos
}

export interface IState {
    todos: ITodo[],
    types: IType[],
    content: EContent
}

export const initialState = <IState>{
    todos: [],
    types: [],
    content: EContent.todos
};