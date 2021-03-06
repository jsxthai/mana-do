import React, { useState } from "react";
import { Todo, TodoStatus } from "../../models/todo";
import Modal from "../Modal/Modal";

export interface PropsToolBar {
  todos: Todo[];
  activeTodos: number;
  handleSetShowing: Function;
  onDeleteAllTodo: Function;
  onToggleAllTodo: Function;
}

const TodoToolbar = ({
  todos,
  activeTodos,
  handleSetShowing,
  onDeleteAllTodo,
  onToggleAllTodo,
}: PropsToolBar) => {
  const [isActiveDelete, setIsActiveDelete] = useState(false);

  const ToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggleAllTodo(e.target.checked);
  };

  const DeleteAllTodo = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (todos.length > 0) {
      setIsActiveDelete((pre) => !pre);
    }
  };

  const handleModal = (action: string) => {
    setIsActiveDelete((pre) => !pre);
    switch (action) {
      case "close":
        break;
      case "delete":
        onDeleteAllTodo();
        break;
    }
  };

  return (
    <div>
      <Modal isActive={isActiveDelete} handleModal={handleModal} />
      <div className="ToDo__toolbar">
        {todos.length > 0 ? (
          <input
            type="checkbox"
            checked={activeTodos === 0}
            onChange={ToggleAllTodo}
          />
        ) : (
          <div />
        )}
        <div className="ToDo__tabs">
          <div className="Action__group">
            <button
              className="Action__btn "
              onClick={() => handleSetShowing(TodoStatus.ACTIVE)}
            >
              Active
            </button>

            <button
              className="Action__btn"
              onClick={() => handleSetShowing(TodoStatus.COMPLETED)}
            >
              Completed
            </button>
          </div>
          <div>
            <button
              className="Action__btn"
              onClick={() => handleSetShowing("ALL")}
            >
              All
            </button>

            <button
              className="Action__btn Action__btn--delete"
              onClick={DeleteAllTodo}
            >
              Clear all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoToolbar;
