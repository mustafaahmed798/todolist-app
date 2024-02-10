import React, { useState } from "react";
import Todos from "../components/todos/Todos";
import TodosForm from "../components/todos/TodosForm";

const initialData = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];
const TodoList = () => {
  const [todos, setTodos] = useState(initialData);
  const [mode, setMode] = useState("add");
  const [activeTodo, setActiveTodo] = useState(null);

  const setToLocal = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleTodo = (id) => {
    setTodos((data) => {
      const newData = data.map((td) => {
        if (td.id === id) {
          return { ...td, done: !td.done };
        } else {
          return td;
        }
      });
      return newData;
    });
  };

  const deleteTodo = (id) => {
    setTodos((data) => {
      const newData = data.filter((td) => td.id !== id);
      return newData;
    });
  };

  const addNewTodo = (title) => {
    if (mode !== "edit") {
      const newTodo = {
        id: new Date().getTime(),
        title,
        done: false,
      };

      setTodos((data) => {
        return [newTodo, ...data];
      });
    } else if (mode === "edit") {
      const newTodos = todos.map((t) => {
        if (t.id === activeTodo.id) {
          t.title = title;
        }
        return t;
      });
      setTodos(newTodos);
      setMode("add");
    }
  };

  const toggleFilter = () => {
    if (mode === "edit") {
      return;
    }
    if (mode === "filter") {
      setMode("add");
    } else {
      setMode("filter");
    }
  };

  const editTodo = (todo) => {
    setMode("edit");
    setActiveTodo(todo);
  };

  let currentTodos = [...todos];

  if (mode === "filter") {
    currentTodos = todos.filter((t) => !t.done);
  }
  if (mode === "edit" && activeTodo) {
    currentTodos = [activeTodo];
  }

  setToLocal();
  return (
    <main>
      <div className="container">
        <div className="todos">
          <TodosForm
            addNewTodo={addNewTodo}
            toggleFilter={toggleFilter}
            mode={mode}
            activeTodo={activeTodo}
          />

          <Todos
            mode={mode}
            todos={currentTodos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        </div>
      </div>
    </main>
  );
};

export default TodoList;
