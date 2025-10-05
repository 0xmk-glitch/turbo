import { createAction, props } from '@ngrx/store';
import {
  Organization,
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '@turbo-task-master/api-interfaces';

// Load Organizations
export const loadOrganizations = createAction(
  '[Organizations] Load Organizations',
);
export const loadOrganizationsSuccess = createAction(
  '[Organizations] Load Organizations Success',
  props<{ organizations: Organization[] }>(),
);
export const loadOrganizationsFailure = createAction(
  '[Organizations] Load Organizations Failure',
  props<{ error: string }>(),
);

// Load Organization by ID
export const loadOrganization = createAction(
  '[Organizations] Load Organization',
  props<{ id: string }>(),
);
export const loadOrganizationSuccess = createAction(
  '[Organizations] Load Organization Success',
  props<{ organization: Organization }>(),
);
export const loadOrganizationFailure = createAction(
  '[Organizations] Load Organization Failure',
  props<{ error: string }>(),
);

// Create Organization
export const createOrganization = createAction(
  '[Organizations] Create Organization',
  props<{ organization: CreateOrganizationDto }>(),
);
export const createOrganizationSuccess = createAction(
  '[Organizations] Create Organization Success',
  props<{ organization: Organization }>(),
);
export const createOrganizationFailure = createAction(
  '[Organizations] Create Organization Failure',
  props<{ error: string }>(),
);

// Update Organization
export const updateOrganization = createAction(
  '[Organizations] Update Organization',
  props<{ id: string; organization: UpdateOrganizationDto }>(),
);
export const updateOrganizationSuccess = createAction(
  '[Organizations] Update Organization Success',
  props<{ organization: Organization }>(),
);
export const updateOrganizationFailure = createAction(
  '[Organizations] Update Organization Failure',
  props<{ error: string }>(),
);

// Delete Organization
export const deleteOrganization = createAction(
  '[Organizations] Delete Organization',
  props<{ id: string }>(),
);
export const deleteOrganizationSuccess = createAction(
  '[Organizations] Delete Organization Success',
  props<{ id: string }>(),
);
export const deleteOrganizationFailure = createAction(
  '[Organizations] Delete Organization Failure',
  props<{ error: string }>(),
);

// Set Current Organization
export const setCurrentOrganization = createAction(
  '[Organizations] Set Current Organization',
  props<{ organization: Organization }>(),
);

// Clear Current Organization
export const clearCurrentOrganization = createAction(
  '[Organizations] Clear Current Organization',
);

// Clear Error
export const clearOrganizationsError = createAction(
  '[Organizations] Clear Error',
);
