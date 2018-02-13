import * as React from 'react';
import * as PropTypes from 'prop-types';
import InputMoment from 'input-moment';
import {IType} from "../../model/Todo";
import * as moment from 'moment';
import {EContent} from "../../model/InitialState";

interface IAddTodoForm {
    types: IType[],
    addTodo: Function,
    saveTodo: Function,
    switchContent: Function,
}

export class AddTodoForm extends React.Component<IAddTodoForm> {
    static propsTypes = {
        types: PropTypes.array.isRequired,
        addTodo: PropTypes.func.isRequired,
        saveTodo: PropTypes.func.isRequired,
        switchContent: PropTypes.func.isRequired
    };

    state = {
        task: '',
        type: 1,
        expires_at: Date.now()
    };

    handleChangeExpiresAt = m => {
        this.setState({ expires_at: +m });
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSave = (e) => {
        e.preventDefault();

        this.props.saveTodo({
            task: this.state.task,
            type: this.state.type,
            created_at: Date.now(),
            expires_at: +this.state.expires_at
        });
    };

    handleCancel = (e) => {
        e.preventDefault();

        this.props.switchContent(EContent.todos);
    };

    render() {
        return(
            <div>
                <h1>Create todo</h1>

                <form>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label>Task:</label>
                                <input
                                    type="text"
                                    name="task"
                                    className="form-control"
                                    value={this.state.task}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Type:</label>
                                <select
                                    name="type"
                                    className="form-control"
                                    value={this.state.type}
                                    onChange={this.handleChange}
                                >
                                    {this.props.types.map(type => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label className="row">Expires at:</label>
                                <InputMoment
                                    moment={moment(this.state.expires_at)}
                                    onChange={this.handleChangeExpiresAt}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <button className="btn btn-primary" onClick={this.handleSave}>Save</button>
                        <button className="btn btn-default ml-2" onClick={this.handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}