import { useState } from "react";
import {
  Modal,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SendIcon from "@mui/icons-material/Send";
import { useTodos } from "../context/context";

interface myPropsI {
  id: number | string;
  status: boolean;
  closeForm: () => void;
}

const EditModalForm: React.FC<myPropsI> = ({ id, status, closeForm }) => {
  const { dispatch } = useTodos();
  const { todos } = useTodos();

  const editablePost = todos.filter((todo) => todo.id === id);
  const { title, text } = editablePost[0];
  const [values, setValues] = useState({
    title,
    text,
  });

  const handleEditPost = () => {
    dispatch({
      type: "EDIT",
      payload: { id: id, title: values.title, text: values.text },
    });
    setValues({ title: "", text: "" });
    closeForm();
  };

  const readyToSave =
    Boolean(title.trim() !== values.title || text.trim() !== values.text) &&
    Boolean(values.title.trim()) &&
    Boolean(values.text.trim());

  return (
    <div className="edit-todo">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Modal open={status} onClose={closeForm}>
          <Grid alignItems="scretch">
            <Box className="form-modal-add">
              <Typography variant="h2" fontWeight={600} fontSize="4vh">
                Відредагувати нагадування
              </Typography>
              <IconButton
                color="primary"
                className="form-close"
                sx={{ position: "absolute", top: 5, right: 5 }}
                size="large"
                onClick={closeForm}
              >
                <ClearIcon />
              </IconButton>

              <form id="unstyled-modal-description" className="form">
                <TextField
                  id="postTitle"
                  label="Заголовок посту"
                  name="title"
                  value={values.title}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                  variant="outlined"
                />
                <TextField
                  multiline
                  label="Що ти плануєшь зробити?"
                  name="text"
                  id="outlined-size-normal"
                  value={values.text}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                  InputProps={{
                    rows: 3,
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleEditPost}
                  size="large"
                  className="form-btn"
                  endIcon={<SendIcon />}
                  disabled={!readyToSave}
                >
                  Зберегти зміни
                </Button>
              </form>
            </Box>
          </Grid>
        </Modal>
      </Grid>
    </div>
  );
};

export default EditModalForm;