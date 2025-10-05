import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { TasksService } from '../../services/tasks.service';
import * as TasksActions from './tasks.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TasksEffects {
  private actions$ = inject(Actions);
  private tasksService = inject(TasksService);
  private store = inject(Store);
  private snackBar = inject(MatSnackBar);

  // Load Tasks Effect
  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      switchMap(() => {
        return this.tasksService.getTasks().pipe(
          map((tasks) => TasksActions.loadTasksSuccess({ tasks })),
          catchError((error) =>
            of(
              TasksActions.loadTasksFailure({
                error: error.message || 'Failed to load tasks',
              }),
            ),
          ),
        );
      }),
    );
  });

  // Load Task by ID Effect
  loadTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksActions.loadTask),
      switchMap(({ id }) => {
        return this.tasksService.getTask(id).pipe(
          map((task) => TasksActions.loadTaskSuccess({ task })),
          catchError((error) =>
            of(
              TasksActions.loadTaskFailure({
                error: error.message || 'Failed to load task',
              }),
            ),
          ),
        );
      }),
    );
  });

  // Create Task Effect
  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksActions.createTask),
      switchMap(({ task }) => {
        return this.tasksService.createTask(task).pipe(
          map((createdTask) =>
            TasksActions.createTaskSuccess({ task: createdTask }),
          ),
          catchError((error) =>
            of(
              TasksActions.createTaskFailure({
                error: error.message || 'Failed to create task',
              }),
            ),
          ),
        );
      }),
    );
  });

  // Create Task Success Effect - Show notification
  createTaskSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TasksActions.createTaskSuccess),
        tap(() => {
          this.snackBar.open('Task created successfully', 'Close', {
            duration: 3000,
          });
        }),
      ),
    { dispatch: false },
  );

  // Update Task Effect
  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksActions.updateTask),
      switchMap(({ id, task }) => {
        return this.tasksService.updateTask(id, task).pipe(
          map((updatedTask) =>
            TasksActions.updateTaskSuccess({ task: updatedTask }),
          ),
          catchError((error) =>
            of(
              TasksActions.updateTaskFailure({
                error: error.message || 'Failed to update task',
              }),
            ),
          ),
        );
      }),
    );
  });

  // Update Task Success Effect - Show notification
  updateTaskSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TasksActions.updateTaskSuccess),
        tap(() => {
          this.snackBar.open('Task updated successfully', 'Close', {
            duration: 3000,
          });
        }),
      ),
    { dispatch: false },
  );

  // Delete Task Effect
  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksActions.deleteTask),
      switchMap(({ id }) => {
        return this.tasksService.deleteTask(id).pipe(
          map(() => TasksActions.deleteTaskSuccess({ id })),
          catchError((error) =>
            of(
              TasksActions.deleteTaskFailure({
                error: error.message || 'Failed to delete task',
              }),
            ),
          ),
        );
      }),
    );
  });

  // Delete Task Success Effect - Show notification
  deleteTaskSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TasksActions.deleteTaskSuccess),
        tap(() => {
          this.snackBar.open('Task deleted successfully', 'Close', {
            duration: 3000,
          });
        }),
      ),
    { dispatch: false },
  );

  // Error Effects - Show error notifications
  loadTasksFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TasksActions.loadTasksFailure),
        tap(({ error }) => {
          this.snackBar.open(`Failed to load tasks: ${error}`, 'Close', {
            duration: 5000,
          });
        }),
      ),
    { dispatch: false },
  );

  createTaskFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TasksActions.createTaskFailure),
        tap(({ error }) => {
          this.snackBar.open(`Failed to create task: ${error}`, 'Close', {
            duration: 5000,
          });
        }),
      ),
    { dispatch: false },
  );

  updateTaskFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TasksActions.updateTaskFailure),
        tap(({ error }) => {
          this.snackBar.open(`Failed to update task: ${error}`, 'Close', {
            duration: 5000,
          });
        }),
      ),
    { dispatch: false },
  );

  deleteTaskFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TasksActions.deleteTaskFailure),
        tap(({ error }) => {
          this.snackBar.open(`Failed to delete task: ${error}`, 'Close', {
            duration: 5000,
          });
        }),
      ),
    { dispatch: false },
  );
}
