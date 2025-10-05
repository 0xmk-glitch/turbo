import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState, tasksAdapter } from './tasks.reducer';
import {
  Task,
  TaskStatus,
  TaskType,
  TaskPriority,
} from '@turbo-task-master/api-interfaces';

export const selectTasksState = createFeatureSelector<TasksState>('tasks');

export const {
  selectAll: selectAllTasks,
  selectEntities: selectTaskEntities,
  selectIds: selectTaskIds,
  selectTotal: selectTasksTotal,
} = tasksAdapter.getSelectors(selectTasksState);

export const selectTasksLoading = createSelector(
  selectTasksState,
  (state) => state.isLoading,
);

export const selectTasksError = createSelector(
  selectTasksState,
  (state) => state.error,
);

export const selectSelectedTaskId = createSelector(
  selectTasksState,
  (state) => state.selectedTaskId,
);

export const selectSelectedTask = createSelector(
  selectTaskEntities,
  selectSelectedTaskId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null),
);

// Filtered selectors
export const selectTasksByStatus = (status: TaskStatus) =>
  createSelector(selectAllTasks, (tasks) =>
    tasks.filter((task) => task.status === status),
  );

export const selectTasksByType = (type: TaskType) =>
  createSelector(selectAllTasks, (tasks) =>
    tasks.filter((task) => task.type === type),
  );

export const selectTasksByPriority = (priority: TaskPriority) =>
  createSelector(selectAllTasks, (tasks) =>
    tasks.filter((task) => task.priority === priority),
  );

export const selectTasksByAssignee = (assigneeId: string) =>
  createSelector(selectAllTasks, (tasks) =>
    tasks.filter((task) => task.assignedTo === assigneeId),
  );

export const selectTasksByOrganization = (organizationId: string) =>
  createSelector(selectAllTasks, (tasks) =>
    tasks.filter((task) => task.organizationId === organizationId),
  );

// Computed selectors
export const selectTasksStats = createSelector(selectAllTasks, (tasks) => ({
  total: tasks.length,
  todo: tasks.filter((task) => task.status === TaskStatus.TODO).length,
  inProgress: tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS)
    .length,
  done: tasks.filter((task) => task.status === TaskStatus.DONE).length,
  cancelled: tasks.filter((task) => task.status === TaskStatus.CANCELLED)
    .length,
  urgent: tasks.filter((task) => task.priority === TaskPriority.URGENT).length,
  overdue: tasks.filter(
    (task) =>
      task.dueDate &&
      new Date(task.dueDate) < new Date() &&
      task.status !== TaskStatus.DONE,
  ).length,
}));

export const selectTasksByStatusGroup = createSelector(
  selectAllTasks,
  (tasks) => ({
    [TaskStatus.TODO]: tasks.filter((task) => task.status === TaskStatus.TODO),
    [TaskStatus.IN_PROGRESS]: tasks.filter(
      (task) => task.status === TaskStatus.IN_PROGRESS,
    ),
    [TaskStatus.DONE]: tasks.filter((task) => task.status === TaskStatus.DONE),
    [TaskStatus.CANCELLED]: tasks.filter(
      (task) => task.status === TaskStatus.CANCELLED,
    ),
  }),
);
