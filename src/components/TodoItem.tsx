import React from "react";
import { useTodos } from "../context/context";
import { Grid, Checkbox, Box, ButtonGroup, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface myPropsI {
  id: number;
  title: string;
  text: string;
  done: boolean;
  getPost: (e: any) => void;
}

const TodoItem: React.FC<myPropsI> = ({ id, title, text, done, getPost }) => {
  const { dispatch } = useTodos();

  const handleComplete = (): void => {
    dispatch({ type: "COMPLETED", payload: { id } });
  };

  const handleDelete = (): void => {
    dispatch({ type: "DELETE", payload: { id } });
  };

  return (
    <li>
      <Box sx={{ flexGrow: 1 }}>
        <div className={`todo-box ${done ? "done" : ""}`}>
          <Grid
            container
            spacing={0}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item md={1} xs="auto">
              <Checkbox
                onChange={handleComplete}
                checked={done}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
              />
            </Grid>
            <Grid item md={9} xs={12}>
              <h3>{title}</h3>
              <div className="todo-text">
                <p>{text}</p>
              </div>
            </Grid>

            <Grid item md="auto" xs={12} container justifyContent="flex-end">
              <ButtonGroup>
                {!done ? (
                  <IconButton aria-label="edit" onClick={getPost} data-id={id}>
                    <EditIcon />
                  </IconButton>
                ) : (
                  ""
                )}
                <IconButton aria-label="delete" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </ButtonGroup>
            </Grid>
          </Grid>
        </div>
      </Box>
    </li>
  );
};

export default TodoItem;