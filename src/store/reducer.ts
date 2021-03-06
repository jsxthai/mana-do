import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT, // add
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

// reducer should be pure and have no side effects
function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      };

    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );

      // shallow copy array, because state todos is not nested array
      // if nested array, deep clone array or use immutablejs library or ...
      const newTodos = [...state.todos];
      newTodos[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: newTodos,
      };

    case TOGGLE_ALL_TODOS:
      // arr.map create new array, not change state of redux
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });

      return {
        ...state,
        todos: tempTodos,
      };

    case DELETE_TODO:
      // arr.filter create new array, not change state of redux
      const todos2 = state.todos.filter((todo) => todo.id !== action.payload);
      return {
        ...state,
        todos: todos2,
      };

    // add case
    case UPDATE_TODO_CONTENT:
      // find index
      const index3 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      // shallow copy
      const newTodos3 = [...state.todos];
      // update content
      newTodos3[index3].content = action.payload.content;
      return {
        ...state,
        todos: newTodos3,
      };

    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: [],
      };

    default:
      return state;
  }
}

export default reducer;
