import { Todo } from "../models/Todo";
import { store } from "../redux/store";
import { addTodo, removeTodo, setTodoStatus } from "../redux/todoSlice";

test("Adds a new todo", () => {
  let state = store.getState();
  const initialTodoCount = state.todos.length;
  store.dispatch(addTodo("Tester"));
  state = store.getState();
  const newTodos = state.todos.find(
    (todo: Todo) => todo.description === "Tester"
  );
  expect(newTodos?.description).toBe("Tester");
  expect(newTodos?.completed).toBe(false);
  expect(state.todos.length).toBeGreaterThan(initialTodoCount);
});

test("Updates a todo status", () => {
  let state = store.getState();
  const unchangedTodo = state.todos.find(
    (todo: Todo) => todo.description === "Tester"
  );
  expect(unchangedTodo?.completed).toBe(false);

  store.dispatch(setTodoStatus({ completed: true, id: unchangedTodo?.id }));
  state = store.getState();
  let changeTodo = state.todos.find((todo) => todo.description === "Tester");
  expect(changeTodo?.description).toBe("Tester");
  expect(changeTodo?.completed).toBe(true);

  store.dispatch(setTodoStatus({ completed: false, id: unchangedTodo?.id }));
  state = store.getState();
  const backToUnchangedTodo = state.todos.find(
    (todo: Todo) => todo.description === "Tester"
  );
  expect(backToUnchangedTodo).toEqual(unchangedTodo);
});

test("Deletes a todo from todoList with id", () => {
  let state = store.getState();
  const initialTodoCount = state.todos.length;
  const id = state.todos[0].id;
  store.dispatch(removeTodo(id));
  state = store.getState();
  expect(state.todos.length).toBeLessThan(initialTodoCount);
});
