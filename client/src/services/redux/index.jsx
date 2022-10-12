export { default as mySlice, increment,decrement,incrementByAmount } from "./features/my/mySlice";
export { default as AuthSlice, SignIn, SignOut, Auth } from "./features/auth";
export { default as TodoSlice, GetTodos, AddTodo, DeleteTodo, UpdateTodo } from "./features/todo";

export { store } from "./store/configureStore";
