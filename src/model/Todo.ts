export interface IType {
    id: number,
    name: string
}

export interface IItem {
    task: string,
    expires_at: number,
    created_at: number,
    done: boolean,
    type: number
}

export interface ITodo extends IItem {
    type_name: string,
    id: string
}