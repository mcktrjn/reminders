import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { tasksInitialState } from "../constants";
import { Task } from "../types";

type AddTaskAction = PayloadAction<Pick<Task, "title" | "notes">>;
type EditTaskAction = PayloadAction<Omit<Task, "isChecked">>;
type CheckTaskAction = PayloadAction<Pick<Task, "id" | "isChecked">>;
type DeleteTaskAction = PayloadAction<Pick<Task, "id">>;

const TASKS = "tasks";

const setLocalStorageState = (state: Task[]) => {
  localStorage.setItem(TASKS, JSON.stringify(state));
};

const getLocalStorageState = () => {
  const storedState = localStorage.getItem(TASKS);
  return storedState ? JSON.parse(storedState) : tasksInitialState;
};

const findTaskIndex = (state: Task[], taskId: Task["id"]) => {
  return state.findIndex((task) => task.id === taskId);
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: getLocalStorageState(),
  reducers: {
    addTask: (state: Task[], action: AddTaskAction) => {
      const task = {
        id: Date.now(),
        title: action.payload.title,
        notes: action.payload.notes,
        isChecked: false,
      };
      state.push(task);
      setLocalStorageState(state);
    },
    editTask: (state: Task[], action: EditTaskAction) => {
      const taskIndex = findTaskIndex(state, action.payload.id);
      state[taskIndex] = {
        ...state[taskIndex],
        title: action.payload.title,
        notes: action.payload.notes,
      };
      setLocalStorageState(state);
    },
    checkTask: (state: Task[], action: CheckTaskAction) => {
      const taskIndex = findTaskIndex(state, action.payload.id);
      state[taskIndex].isChecked = action.payload.isChecked;
      setLocalStorageState(state);
    },
    deleteTask: (state: Task[], action: DeleteTaskAction) => {
      const updatedState = state.filter((task) => task.id !== action.payload.id);
      setLocalStorageState(updatedState);
      return updatedState;
    },
  },
});

export const {
  actions: { addTask, editTask, checkTask, deleteTask },
  reducer: tasksReducer,
} = tasksSlice;

export const selectTasks = (state: { tasks: Task[] }) => state.tasks;
