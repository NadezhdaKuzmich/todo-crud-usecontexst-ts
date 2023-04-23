import React, { useContext, useReducer } from "react";
import { Todo } from "../types/type";
import { TodoAction } from "./actions";
import { todoReducer } from "./reducer";

interface TodoContextI {
  todos: Todo[];
  dispatch: (arg: TodoAction) => void;
}

type reducerFunc = (state: Todo[], action: TodoAction) => Todo[];

const initialContext: TodoContextI = {
  todos: [
    {
      id: 1,
      title: "Вивчення верстки",
      text: "Вивчити HTML елементи та атрибути",
      done: true,
    },
    {
      id: 2,
      title: "Вивчення стилів",
      text: "Вивчити CSS, SCSS, LESS, SASS",
      done: true,
    },
    {
      id: 3,
      title: "Вивчення JavaScript",
      text: "Вивчити JS, jSON, AJAX, Fetch, та багато іншого.",
      done: false,
    },
    {
      id: 4,
      title: "Вивчення бібліотек",
      text: "Вивчити React, Redux, Router, та багато іншого.",
      done: false,
    },
    {
      id: 5,
      title: "Вивчення TypeScript",
      text: "Вивчити типи даних, типи функцій",
      done: false,
    },
  ],
  dispatch: () => console.error("Context not initialized"),
};

const TodoContext = React.createContext<TodoContextI>(initialContext);

interface Props {
  children?: React.ReactNode;
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer<reducerFunc>(
    todoReducer,
    initialContext.todos
  );
  return (
    <TodoContext.Provider value={{ todos: state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = (): TodoContextI => useContext(TodoContext);