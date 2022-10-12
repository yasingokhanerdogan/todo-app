import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_TODOS, ADD_TODO, DELETE_TODO, UPDATE_TODO } from "../../axios";

const initialState = {
  todos: null,
  isLoading: false,
  message: null,
};

const GetTodos = createAsyncThunk("Todo/GetTodos", async (id) => {
  try {
    return await GET_TODOS(id).then((res) => res);
  } catch (error) {
    return error;
  }
});

const AddTodo = createAsyncThunk("Todo/AddTodo", async (todo) => {
  try {
    return await ADD_TODO(todo).then((res) => res);
  } catch (error) {
    return error;
  }
});

const DeleteTodo = createAsyncThunk("Todo/DeleteTodo", async (id) => {
  try {
    return await DELETE_TODO(id).then((res) => res);
  } catch (error) {
    return error;
  }
});

const UpdateTodo = createAsyncThunk("Todo/UpdateTodo", async (formData) => {
  try {
    return await UPDATE_TODO(formData).then((res) => res);
  } catch (error) {
    return error;
  }
});

const TodoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {},
  extraReducers: {
    [GetTodos.pending]: (state) => {
      state.todos = null;
      state.message = null;
      state.isLoading = true;
    },
    [GetTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload.data.todos) {
        state.todos = action.payload.data.todos;
      }
    },
    [GetTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.data.error;
    },
    [AddTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [AddTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload.data.error) {
        state.message = action.payload.data.error;
      } else {
        state.todos.push(action.payload.data.todo);
      }
    },
    [AddTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.data.error;
    },
    [DeleteTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [DeleteTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload.data.todo) {
        state.todos = state.todos.filter(item => item.id !== action.payload.data.todo.id);
      } else {
        state.message = action.payload.data.error;
      }
    },
    [DeleteTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.data.error;
    },
    [UpdateTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [UpdateTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload.data.todo) {
        let index = state.todos.findIndex(item => item.id === action.payload.data.todo.id);
        state.todos[index] = action.payload.data.todo;
      } else {
        state.message = action.payload.data.error;
      }
    },
    [UpdateTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.data.error;
    },
  },
});

export { GetTodos, AddTodo, DeleteTodo, UpdateTodo };
// export { GetTodos, AddTodo, DeleteTodo, ChangeStatus };

export default TodoSlice.reducer;
