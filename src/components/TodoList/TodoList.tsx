import * as React from "react";
import {ITodo} from "../../model/Todo";
import * as PropTypes from 'prop-types';
import {TodoListHeader} from "./TodoListHeader";
import {TodoListBody} from "./TodoListBody";
import {EContent} from "../../model/InitialState";

interface ITodoList {
    todos: ITodo[],
    markAsDoneTodo: Function,
    switchContent: Function,
}

export class TodoList extends React.Component<ITodoList>{

    static propTypes = {
        todos: PropTypes.array.isRequired,
        markAsDoneTodo: PropTypes.func.isRequired,
        switchContent: PropTypes.func.isRequired,
    };

    createTodo = () => {
        this.props.switchContent(EContent.form)
    };

    render() {
        return (

            <div>
                <h1>Todos</h1>

                <div className="row justify-content-end">
                    <button type="button" onClick={this.createTodo} className="btn btn-primary">Create todo</button>
                </div>

                <table className="table">
                    {TodoListHeader()}
                    <TodoListBody
                        todos={this.props.todos}
                        markAsDoneTodo={this.props.markAsDoneTodo}
                    />
                </table>
            </div>
        )
    }
}