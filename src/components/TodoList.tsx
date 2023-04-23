import React from "react";
import TodoItem from "./TodoItem";
import { useTodos } from "../context/context";
import { Typography } from "@mui/material";

interface myPropsI {
  handleEdit: (id: number) => void;
  openEdit: () => void;
}

const TodoList: React.FC<myPropsI> = ({ handleEdit, openEdit }) => {
  const { todos } = useTodos();

  const getPost = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const btn = e.currentTarget;
    const id = Number(btn.dataset.id);
    handleEdit(id);
    openEdit();
  };

  return (
    <>
      {todos.length !== 0 ? (
        <div className="list-container">
          <Typography
            variant="h2"
            fontWeight={600}
            fontSize={22}
            className="list-container-title"
          >
            Перелік справ:
          </Typography>
          <ul className="todo-list">
            {todos.map((todo) => (
              <TodoItem key={todo.id} {...todo} getPost={getPost} />
            ))}
          </ul>
        </div>
      ) : (
        <div className="empty-list">
          <Typography variant="h2" fontWeight={600} fontSize={22}>
            Немає жодної запланованої справи!
          </Typography>
          <p>Додай всі свої справи, щоб все встигнути і нічого не забути.</p>
        </div>
      )}
    </>
  );
};

export default TodoList;