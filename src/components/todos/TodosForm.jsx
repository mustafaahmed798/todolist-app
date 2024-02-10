import FeatherIcon from "feather-icons-react";
import React, { useState } from "react";

const TodosForm = ({ addNewTodo, toggleFilter, mode, activeTodo }) => {
  const [title, setTitle] = useState("");
  const [editRender, setEditRender] = useState(false);

  if (mode === "edit" && !editRender) {
    setTitle(activeTodo.title);
    setEditRender(true);
  }
  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };
  const handleAddNewTodo = () => {
    setEditRender(false);
    if (!title.trim()) {
      return;
    }
    addNewTodo(title);
    setTitle("");
  };
  return (
    <div className="todos-form">
      <div
        className={`todos-form_icon ${mode === "filter" ? "active" : ""}`}
        onClick={toggleFilter}
      >
        <FeatherIcon icon="circle" />
      </div>
      <div className="todos-form_form">
        <input
          type="text"
          placeholder="اضف مهمة جديدة ..."
          value={title}
          onChange={handleInputChange}
        />
      </div>
      <div className="todos-form_submit">
        <button
          className="btn"
          onClick={handleAddNewTodo}
          disabled={!title.trim()}
        >
          {mode === "edit" ? "تعديل" : "إضافة"}
        </button>
      </div>
    </div>
  );
};

export default TodosForm;
