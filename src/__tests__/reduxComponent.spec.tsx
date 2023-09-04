import { render, screen, RenderResult } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Todo } from "../models/Todo";
import TodoItem from "../components/listItem";
import { addTodo } from "../redux/todoSlice";

const renderTodo = (todo: Todo): RenderResult =>
  render(
    <Provider store={store}>
      <TodoItem todo={todo} />
    </Provider>
  );

const getATodo = (bookDescription: string): Todo => {
  store.dispatch(addTodo("Tester"));
  const todo = store
    .getState()
    .todos.find((book) => book.description === bookDescription);
  expect(todo).not.toBeUndefined();
  return todo as Todo;
};

test("Renders TodoItem", () => {
  const todo = getATodo("Tester");
  renderTodo(todo);
  expect(screen.getByText("Tester")).toHaveTextContent("Tester");
});
