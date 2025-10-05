import { createAction, props } from '@ngrx/store';
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
} from '@turbo-task-master/api-interfaces';

// Load Tasks
export const loadTasks = createAction('[Tasks] Load Tasks');
export const loadTasksSuccess = createAction(
  '[Tasks] Load Tasks Success',
  props<{ tasks: Task[] }>(),
);
export const loadTasksFailure = createAction(
  '[Tasks] Load Tasks Failure',
  props<{ error: string }>(),
);

// Load Task by ID
export const loadTask = createAction(
  '[Tasks] Load Task',
  props<{ id: string }>(),
);
export const loadTaskSuccess = createAction(
  '[Tasks] Load Task Success',
  props<{ task: Task }>(),
);
export const loadTaskFailure = createAction(
  '[Tasks] Load Task Failure',
  props<{ error: string }>(),
);

// Create Task
export const createTask = createAction(
  '[Tasks] Create Task',
  props<{ task: CreateTaskDto }>(),
);
export const createTaskSuccess = createAction(
  '[Tasks] Create Task Success',
  props<{ task: Task }>(),
);
export const createTaskFailure = createAction(
  '[Tasks] Create Task Failure',
  props<{ error: string }>(),
);

// Update Task
export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ id: string; task: UpdateTaskDto }>(),
);
export const updateTaskSuccess = createAction(
  '[Tasks] Update Task Success',
  props<{ task: Task }>(),
);
export const updateTaskFailure = createAction(
  '[Tasks] Update Task Failure',
  props<{ error: string }>(),
);

// Delete Task
export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ id: string }>(),
);
export const deleteTaskSuccess = createAction(
  '[Tasks] Delete Task Success',
  props<{ id: string }>(),
);
export const deleteTaskFailure = createAction(
  '[Tasks] Delete Task Failure',
  props<{ error: string }>(),
);

// Select Task
export const selectTask = createAction(
  '[Tasks] Select Task',
  props<{ id: string }>(),
);

// Clear Selection
export const clearTaskSelection = createAction('[Tasks] Clear Task Selection');

// Clear Error
export const clearTasksError = createAction('[Tasks] Clear Error');
