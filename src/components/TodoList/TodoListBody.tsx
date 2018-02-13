import * as React from "react";
import {ITodo} from "../../model/Todo";
import {TodoRow} from "./TodoRow";
import * as PropTypes from 'prop-types';

interface ITodoListBody {
    todos: ITodo[],
    markAsDoneTodo: Function
}

export class TodoListBody extends React.Component<ITodoListBody>{

    static propTypes = {
        todos: PropTypes.array.isRequired,
        markAsDoneTodo: PropTypes.func.isRequired
    };

    render() {
        return (
            <tbody id="tableInner">
            {this.props.todos.map(todo => (
                <TodoRow
                    key={todo.id}
                    todo={todo}
                    markAsDoneTodo={this.props.markAsDoneTodo}
                />
            ))}
            </tbody>
        )
    }
}