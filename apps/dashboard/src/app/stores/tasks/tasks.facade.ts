import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
  TaskStatus,
  TaskType,
  TaskPriority,
} from '@turbo-task-master/api-interfaces';
import * as TasksActions from './tasks.actions';
import * as TasksSelectors from './tasks.selectors';

@Injectable({
  providedIn: 'root',
})
export class TasksFacade {
  private store = inject(Store);

  // Selectors
  tasks$ = this.store.select(TasksSelectors.selectAllTasks);
  selectedTask$ = this.store.select(TasksSelectors.selectSelectedTask);
  selectedTaskId$ = this.store.select(TasksSelectors.selectSelectedTaskId);
  isLoading$ = this.store.select(TasksSelectors.selectTasksLoading);
  error$ = this.store.select(TasksSelectors.selectTasksError);
  tasksStats$ = this.store.select(TasksSelectors.selectTasksStats);
  tasksByStatusGroup$ = this.store.select(
    TasksSelectors.selectTasksByStatusGroup,
  );

  // Filtered selectors
  getTasksByStatus = (status: TaskStatus) =>
    this.store.select(TasksSelectors.selectTasksByStatus(status));
  getTasksByType = (type: TaskType) =>
    this.store.select(TasksSelectors.selectTasksByType(type));
  getTasksByPriority = (priority: TaskPriority) =>
    this.store.select(TasksSelectors.selectTasksByPriority(priority));
  getTasksByAssignee = (assigneeId: string) =>
    this.store.select(TasksSelectors.selectTasksByAssignee(assigneeId));
  getTasksByOrganization = (organizationId: string) =>
    this.store.select(TasksSelectors.selectTasksByOrganization(organizationId));

  // Actions
  loadTasks(): void {
    this.store.dispatch(TasksActions.loadTasks());
  }

  loadTask(id: string): void {
    this.store.dispatch(TasksActions.loadTask({ id }));
  }

  createTask(task: CreateTaskDto): void {
    this.store.dispatch(TasksActions.createTask({ task }));
  }

  updateTask(id: string, task: UpdateTaskDto): void {
    this.store.dispatch(TasksActions.updateTask({ id, task }));
  }

  deleteTask(id: string): void {
    this.store.dispatch(TasksActions.deleteTask({ id }));
  }

  selectTask(id: string): void {
    this.store.dispatch(TasksActions.selectTask({ id }));
  }

  clearTaskSelection(): void {
    this.store.dispatch(TasksActions.clearTaskSelection());
  }

  clearError(): void {
    this.store.dispatch(TasksActions.clearTasksError());
  }
}
