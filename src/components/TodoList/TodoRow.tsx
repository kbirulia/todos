import * as React from "react";
import {ITodo} from "../../model/Todo";
import * as PropTypes from 'prop-types';

interface ITodoRow {
    todo: ITodo,
    markAsDoneTodo: Function
}
export class TodoRow extends React.Component<ITodoRow>{

    static propTypes = {
        todo: PropTypes.object.isRequired,
        markAsDoneTodo: PropTypes.func.isRequired
    };

    getDateFormat = date => {
        const dateObj = new Date(date);

        return dateObj.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'long'
        });
    };

    markAsDone = () => {
        const {todo} = this.props;

        this.props.markAsDoneTodo(todo.id);
    };

    render() {
        const {todo} = this.props;
        const className = todo.done ? 'alert alert-success' : 'alert alert-warning';

        return (
            <tr className={className}>
                <td>{this.getDateFormat(todo.created_at)}</td>
                <td>{this.getDateFormat(todo.expires_at)}</td>
                <td>{todo.task}</td>
                <td>{todo.type_name}</td>
                <td>
                    {todo.done
                    ? 'Done'
                    : <button type="button" onClick={this.markAsDone} className="btn btn-primary">Mark as done</button>}
                </td>
            </tr>
        )
    }
}