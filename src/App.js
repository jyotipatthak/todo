import React from "react";
import Todo from "./components/Todo";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className='text-center'> Todo React App</h1>
        <Todo />
      </div>
    );
  }
}

export default App;