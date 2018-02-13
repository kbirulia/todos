import * as React from "react";
import {connect} from "react-redux";
import {EContent, IState} from "../model/InitialState";
import {AddTodoForm} from "./AddTodo/AddTodoForm";
import {addTodoAction, markAsDoneTodoAction, saveTodoAction} from "../actions/todosActions";
import {TodoList} from "./TodoList/TodoList";
import {switchContentAction} from "../actions/contentActions";

const mapDispatchToProps = {
    addTodo: addTodoAction,
    markAsDoneTodo: markAsDoneTodoAction,
    switchContent: switchContentAction,
    saveTodo: saveTodoAction
};

interface IDispatchers {
    addTodo: Function
    switchContent: Function
    markAsDoneTodo: Function
    saveTodo: Function
}

interface IApp extends IState, IDispatchers{}

@(connect as any)(s => s, mapDispatchToProps)
export class App extends React.Component<IApp, IDispatchers>{


    render() {
        const {todos, markAsDoneTodo, types, addTodo, content, switchContent, saveTodo} = this.props;

        return (
            <div className="container">

                    {content === EContent.todos
                    ? <TodoList
                            todos={todos}
                            markAsDoneTodo={markAsDoneTodo}
                            switchContent={switchContent}
                        />
                    : <AddTodoForm
                            types={types}
                            addTodo={addTodo}
                            saveTodo={saveTodo}
                            switchContent={switchContent}
                        />}

            </div>
        );
    }
}
