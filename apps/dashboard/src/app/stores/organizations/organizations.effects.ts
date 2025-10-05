import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { OrganizationsService } from '../../services/organizations.service';
import * as OrganizationsActions from './organizations.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class OrganizationsEffects {
  private actions$ = inject(Actions);
  private organizationsService = inject(OrganizationsService);
  private store = inject(Store);
  private snackBar = inject(MatSnackBar);

  // Load Organizations Effect
  loadOrganizations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrganizationsActions.loadOrganizations),
      switchMap(() => {
        return this.organizationsService.getOrganizations().pipe(
          map((organizations) =>
            OrganizationsActions.loadOrganizationsSuccess({ organizations }),
          ),
          catchError((error) =>
            of(
              OrganizationsActions.loadOrganizationsFailure({
                error: error.message || 'Failed to load organizations',
              }),
            ),
          ),
        );
      }),
    );
  });

  // Load Organization by ID Effect
  loadOrganization$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrganizationsActions.loadOrganization),
      switchMap(({ id }) => {
        return this.organizationsService.getOrganization(id).pipe(
          map((organization) =>
            OrganizationsActions.loadOrganizationSuccess({ organization }),
          ),
          catchError((error) =>
            of(
              OrganizationsActions.loadOrganizationFailure({
                error: error.message || 'Failed to load organization',
              }),
            ),
          ),
        );
      }),
    );
  });

  // Create Organization Effect
  createOrganization$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrganizationsActions.createOrganization),
      switchMap(({ organization }) => {
        return this.organizationsService.createOrganization(organization).pipe(
          map((createdOrganization) =>
            OrganizationsActions.createOrganizationSuccess({
              organization: createdOrganization,
            }),
          ),
          catchError((error) =>
            of(
              OrganizationsActions.createOrganizationFailure({
                error: error.message || 'Failed to create organization',
              }),
            ),
          ),
        );
      }),
    );
  });

  // Create Organization Success Effect - Show notification
  createOrganizationSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrganizationsActions.createOrganizationSuccess),
        tap(() => {
          this.snackBar.open('Organization created successfully', 'Close', {
            duration: 3000,
          });
        }),
      ),
    { dispatch: false },
  );

  // Update Organization Effect
  updateOrganization$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrganizationsActions.updateOrganization),
      switchMap(({ id, organization }) => {
        return this.organizationsService
          .updateOrganization(id, organization)
          .pipe(
            map((updatedOrganization) =>
              OrganizationsActions.updateOrganizationSuccess({
                organization: updatedOrganization,
              }),
            ),
            catchError((error) =>
              of(
                OrganizationsActions.updateOrganizationFailure({
                  error: error.message || 'Failed to update organization',
                }),
              ),
            ),
          );
      }),
    );
  });

  // Update Organization Success Effect - Show notification
  updateOrganizationSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrganizationsActions.updateOrganizationSuccess),
        tap(() => {
          this.snackBar.open('Organization updated successfully', 'Close', {
            duration: 3000,
          });
        }),
      ),
    { dispatch: false },
  );

  // Delete Organization Effect
  deleteOrganization$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrganizationsActions.deleteOrganization),
      switchMap(({ id }) => {
        return this.organizationsService.deleteOrganization(id).pipe(
          map(() => OrganizationsActions.deleteOrganizationSuccess({ id })),
          catchError((error) =>
            of(
              OrganizationsActions.deleteOrganizationFailure({
                error: error.message || 'Failed to delete organization',
              }),
            ),
          ),
        );
      }),
    );
  });

  // Delete Organization Success Effect - Show notification
  deleteOrganizationSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrganizationsActions.deleteOrganizationSuccess),
        tap(() => {
          this.snackBar.open('Organization deleted successfully', 'Close', {
            duration: 3000,
          });
        }),
      ),
    { dispatch: false },
  );

  // Error Effects - Show error notifications
  loadOrganizationsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrganizationsActions.loadOrganizationsFailure),
        tap(({ error }) => {
          this.snackBar.open(
            `Failed to load organizations: ${error}`,
            'Close',
            { duration: 5000 },
          );
        }),
      ),
    { dispatch: false },
  );

  createOrganizationFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrganizationsActions.createOrganizationFailure),
        tap(({ error }) => {
          this.snackBar.open(
            `Failed to create organization: ${error}`,
            'Close',
            { duration: 5000 },
          );
        }),
      ),
    { dispatch: false },
  );

  updateOrganizationFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrganizationsActions.updateOrganizationFailure),
        tap(({ error }) => {
          this.snackBar.open(
            `Failed to update organization: ${error}`,
            'Close',
            { duration: 5000 },
          );
        }),
      ),
    { dispatch: false },
  );

  deleteOrganizationFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrganizationsActions.deleteOrganizationFailure),
        tap(({ error }) => {
          this.snackBar.open(
            `Failed to delete organization: ${error}`,
            'Close',
            { duration: 5000 },
          );
        }),
      ),
    { dispatch: false },
  );
}
