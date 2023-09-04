import { useState } from "react";
import { Button, List, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addTodo } from "../../redux/todoSlice";

import TodoItem from "../listItem";
import FilterList from "../filterList";
import { Todo } from "../../models/Todo";

const getVisibleTodos = (todos: Todo[], filter: String) => {
  switch (filter) {
    case "ALL":
      return todos;
    case "COMPLETE":
      return todos.filter((t) => t.completed);
    case "ACTION":
      return todos.filter((t) => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const Todos = () => {
  const [todoDescription, setTodoDescription] = useState("");

  const todoList = useSelector((state: RootState) =>
    getVisibleTodos(state.todos, state.filterMode)
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Typography
        style={{ textAlign: "center", margin: "25px 0" }}
        variant="h3"
      >
        My todos
      </Typography>
      <TextField
        variant="outlined"
        label="To Do Item"
        autoFocus={true}
        fullWidth
        onChange={(e) => setTodoDescription(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && todoDescription.length > 0) {
            dispatch(addTodo(todoDescription));
            setTodoDescription("");
          }
        }}
        value={todoDescription}
        style={{ marginBottom: "15px" }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => {
          if (todoDescription.length > 0) {
            dispatch(addTodo(todoDescription));
            setTodoDescription("");
          }
        }}
      >
        Add Item
      </Button>
      <List>
        {todoList.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </List>
      <FilterList />
    </>
  );
};

export default Todos;
