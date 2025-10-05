import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Task } from '@turbo-task-master/api-interfaces';
import * as TasksActions from './tasks.actions';

export interface TasksState extends EntityState<Task> {
  isLoading: boolean;
  error: string | null;
  selectedTaskId: string | null;
}

export const tasksAdapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: (task: Task) => task.id,
  sortComparer: (a: Task, b: Task) =>
    a.createdAt.getTime() - b.createdAt.getTime(),
});

export const initialTasksState: TasksState = tasksAdapter.getInitialState({
  isLoading: false,
  error: null,
  selectedTaskId: null,
});

export const tasksReducer = createReducer(
  initialTasksState,

  // Load Tasks
  on(TasksActions.loadTasks, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(TasksActions.loadTasksSuccess, (state, { tasks }) =>
    tasksAdapter.setAll(tasks, {
      ...state,
      isLoading: false,
      error: null,
    }),
  ),

  on(TasksActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Load Task by ID
  on(TasksActions.loadTask, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(TasksActions.loadTaskSuccess, (state, { task }) =>
    tasksAdapter.upsertOne(task, {
      ...state,
      isLoading: false,
      error: null,
    }),
  ),

  on(TasksActions.loadTaskFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Create Task
  on(TasksActions.createTask, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(TasksActions.createTaskSuccess, (state, { task }) =>
    tasksAdapter.addOne(task, {
      ...state,
      isLoading: false,
      error: null,
    }),
  ),

  on(TasksActions.createTaskFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Update Task
  on(TasksActions.updateTask, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(TasksActions.updateTaskSuccess, (state, { task }) =>
    tasksAdapter.updateOne(
      { id: task.id, changes: task },
      {
        ...state,
        isLoading: false,
        error: null,
      },
    ),
  ),

  on(TasksActions.updateTaskFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Delete Task
  on(TasksActions.deleteTask, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(TasksActions.deleteTaskSuccess, (state, { id }) =>
    tasksAdapter.removeOne(id, {
      ...state,
      isLoading: false,
      error: null,
    }),
  ),

  on(TasksActions.deleteTaskFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Select Task
  on(TasksActions.selectTask, (state, { id }) => ({
    ...state,
    selectedTaskId: id,
  })),

  // Clear Selection
  on(TasksActions.clearTaskSelection, (state) => ({
    ...state,
    selectedTaskId: null,
  })),

  // Clear Error
  on(TasksActions.clearTasksError, (state) => ({
    ...state,
    error: null,
  })),
);
