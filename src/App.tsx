import { useState } from "react";
import { TodoProvider } from "./context/context";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import EditModalForm from "./components/EditModalForm";
import Grid from "@mui/material/Grid";

const App = () => {
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const openEdit = () => setEdit(true);
  const closeForm = () => setEdit(false);

  const handleEdit = (id: any): any => {
    setId(id);
  };

  return (
    <div className="container">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <div className="todo-wrapp">
          <TodoProvider>
            <Grid alignItems="scretch">
              <AddTodoForm />
              <TodoList handleEdit={handleEdit} openEdit={openEdit} />
            </Grid>
            {edit !== false && (
              <EditModalForm status={edit} closeForm={closeForm} id={id} />
            )}
          </TodoProvider>
        </div>
      </Grid>
    </div>
  );
};

export default App;