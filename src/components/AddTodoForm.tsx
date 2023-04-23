import React, { useState } from "react";
import { useTodos } from "../context/context";
import { Typography, TextField, Button } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";

const initialState = {
  title: "",
  text: "",
};

const AddTodoForm: React.FC = () => {
  const { dispatch } = useTodos();
  const [todo, setTodo] = useState(initialState);
  const [errors, SetErrors] = useState({
    titleError: false,
    textError: false,
  });

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (todo.title && todo.text) {
      dispatch({
        type: "ADD",
        payload: { title: todo.title, text: todo.text },
      });
    }
    setTodo(initialState);
  };

  const readyToSave = Boolean(todo.title.trim()) && Boolean(todo.text.trim());

  return (
    <form>
      <div className="form-container">
        <Typography variant="h1" fontWeight={600} fontSize="4vh" mb="10px" >Плануй свої справи легко:</Typography>
        <TextField
          label="Назва"
          name="title"
          value={todo.title}
          onChange={(e) =>
            setTodo({ ...todo, [e.target.name]: e.target.value })
          }
          onBlur={() =>
            SetErrors({ ...errors, titleError: !todo.title.trim() })
          }
          helperText={errors.titleError ? "Введіть назву!" : ""}
          error={errors.titleError}
        />

        <TextField
          multiline
          label="Що ти плануєшь зробити?"
          name="text"
          id="outlined-size-normal"
          value={todo.text}
          onChange={(e) => setTodo({ ...todo, text: e.target.value })}
          onBlur={() => SetErrors({ ...errors, textError: !todo.text.trim() })}
          helperText={
            errors.textError ? "Введіть опис того, що потрібно зробити!" : ""
          }
          error={errors.textError}
          InputProps={{
            rows: 3,
          }}
        />

        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          disabled={!readyToSave}
          className="form-btn"
          endIcon={<EditNoteIcon />}
        >
          Створити
        </Button>
      </div>
    </form>
  );
};

export default AddTodoForm;