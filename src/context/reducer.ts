import { TodoAction } from "./actions";
import { Todo } from "../types/type";

export const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case "ADD":
      const nextId = Math.max(...state.map((todo) => todo.id)) + 1;

      return state.concat({
        id: nextId,
        title: action.payload.title,
        text: action.payload.text,
        done: false,
      });

    case "COMPLETED":
      return state.map((todo) => {
        if (todo.id !== action.payload.id) {
          return todo;
        }
        return { ...todo, done: !todo.done };
      });

    case "EDIT":
      const { id, title, text } = action.payload;
      const editableTodo = state.find((todo) => todo.id === id);
      if (editableTodo) {
        editableTodo.title = title;
        editableTodo.text = text;
      }
      return state;

    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload.id);

    default:
      return state;
  }
};