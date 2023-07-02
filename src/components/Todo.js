import React from "react";

class Todo extends React.Component {
    // initial state
    state = {
        inputValue: "",
        editTodo: {},
        todosList: localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [],
    }

    // input on change
    handleChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }
    // create new todo function
    addTodo = (e) => {
        e.preventDefault();
        if (this.state.inputValue) {
            // clone old todo list in to a variable
            const todos = [...this.state.todosList];
            // add new todo in cloned variable
            todos.push({
                id: Date.now(),
                value: this.state.inputValue,
                isDone: false,
                // isDeleted:false
            })
            // change oldt todo to new todo
            this.setState({
                inputValue: "",
                todosList: todos
            })
            // save todos in local storage
            localStorage.setItem("todos", JSON.stringify(todos))
        } else {
            alert("please add text in input field")
        }
    }
    // delete todo
    deleteTodo = (deleteItem) => {
        // show alert modal 
        // if confirm delete
        // else cancel
        console.log(deleteItem);
        let todos = [...this.state.todosList];
        todos = todos.filter((todo) => {
            return todo.id !== deleteItem.id
        })
        this.setState({
            todosList: todos
        })
        // save todos in local storage
        localStorage.setItem("todos", JSON.stringify(todos))
    }
    // delete all to do 
    deleteAll = () => {
        this.setState({
            todosList: []
        })
        // save todos in local storage
        localStorage.setItem("todos", JSON.stringify([]))
    }
    // mark to do as done or undone
    handleTodoDone = (doneTodo) => {
        let todos = [...this.state.todosList];
        todos = todos.map((todo) => {
            if (todo.id === doneTodo.id) {
                todo.isDone = !todo.isDone
            }
            return todo
        })
        this.setState({
            todosList: todos
        })
        // save todos in local storage
        localStorage.setItem("todos", JSON.stringify(todos))
    }
    // on edit click
    editTodoClick = (todo) => {
        this.setState({
            editTodo: todo
        })
    }
    // on edit submit
    editTodo = (editTodo) => {
        let todos = [...this.state.todosList];
        todos = todos.map((todo) => {
            if (todo.id === editTodo.id) {
                todo.value = editTodo.value
            }
            return todo
        })
        this.setState({
            todosList: todos
        })
        // save todos in local storage
        localStorage.setItem("todos", JSON.stringify(todos))
    }
    render() {
        return (
            <>
                {/* below form is for creating todo */}
                <form onSubmit={this.addTodo}>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control mr-3"
                            placeholder="Add todo"
                            onChange={this.handleChange}
                            value={this.state.inputValue}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-success"
                                type="submit"
                            >Add Todo</button>
                        </div>
                    </div>
                </form>
                {/* below code is for todo list */}
                <table className="table">
                    <tbody>
                        {this.state.todosList.map((todo, index) => (
                            <tr key={todo.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        defaultChecked={todo.isDone}
                                        onClick={() => this.handleTodoDone(todo)}
                                    />
                                </td>
                                <td>{todo.value}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => this.deleteTodo(todo)}
                                    >Delete</button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm"
                                        data-bs-toggle='modal'
                                        data-bs-target='#exampleModal'
                                        type='button'
                                        onClick={() => this.editTodoClick(todo)}
                                    >Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* below code is for bootstrap modal */}
                <div className='modal fade' id='exampleModal'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title' id='exampleModalLabel'>
                                    Update Todo Value
                                </h5>
                                <button
                                    type='button'
                                    className='btn-close'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'></button>
                            </div>
                            <div className='modal-body'>
                                <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        this.editTodo(this.state.editTodo);
                                    }}>
                                    <div className='mb-3'>
                                        <label htmlFor='recipient-name' className='col-form-label'>
                                            Value:
                                        </label>
                                        {this.state.editTodo?.value && (
                                            <input
                                                type='text'
                                                className='form-control'
                                                value={this.state.editTodo.value}
                                                onChange={e =>
                                                    this.setState({
                                                        ...this.state,
                                                        editTodo: {
                                                            ...this.state.editTodo,
                                                            value: e.target.value,
                                                        },
                                                    })
                                                }
                                            />
                                        )}
                                    </div>
                                    <div className='modal-footer'>
                                        <button
                                            type='button'
                                            className='btn btn-secondary'
                                            data-bs-dismiss='modal'>
                                            Close
                                        </button>
                                        <button
                                            type='submit'
                                            className='btn btn-primary'
                                            data-bs-dismiss='modal'>
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Todo;
