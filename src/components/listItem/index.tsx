import {
  Checkbox,
  Divider,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeTodo, setTodoStatus } from "../../redux/todoSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { Todo } from "../../models/Todo";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <ListItem
        key={todo.id}
        style={{
          opacity: todo.completed ? 0.4 : 1,
        }}
      >
        <ListItemText
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.description}
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => {
              dispatch(removeTodo(todo.id));
            }}
            style={{
              opacity: todo.completed ? 0.4 : 1,
            }}
          >
            <DeleteIcon />
          </IconButton>
          <Checkbox
            edge="end"
            checked={todo.completed}
            onChange={() => {
              dispatch(
                setTodoStatus({ completed: !todo.completed, id: todo.id })
              );
            }}
            style={{
              opacity: todo.completed ? 0.4 : 1,
            }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default TodoItem;
