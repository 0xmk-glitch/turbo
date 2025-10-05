import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Organization } from '@turbo-task-master/api-interfaces';
import * as OrganizationsActions from './organizations.actions';

export interface OrganizationsState extends EntityState<Organization> {
  currentOrganization: Organization | null;
  isLoading: boolean;
  error: string | null;
}

export const organizationsAdapter: EntityAdapter<Organization> =
  createEntityAdapter<Organization>({
    selectId: (organization: Organization) => organization.id,
    sortComparer: (a: Organization, b: Organization) =>
      a.name.localeCompare(b.name),
  });

export const initialOrganizationsState: OrganizationsState =
  organizationsAdapter.getInitialState({
    currentOrganization: null,
    isLoading: false,
    error: null,
  });

export const organizationsReducer = createReducer(
  initialOrganizationsState,

  // Load Organizations
  on(OrganizationsActions.loadOrganizations, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(
    OrganizationsActions.loadOrganizationsSuccess,
    (state, { organizations }) =>
      organizationsAdapter.setAll(organizations, {
        ...state,
        isLoading: false,
        error: null,
      }),
  ),

  on(OrganizationsActions.loadOrganizationsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Load Organization by ID
  on(OrganizationsActions.loadOrganization, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(OrganizationsActions.loadOrganizationSuccess, (state, { organization }) =>
    organizationsAdapter.upsertOne(organization, {
      ...state,
      isLoading: false,
      error: null,
    }),
  ),

  on(OrganizationsActions.loadOrganizationFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Create Organization
  on(OrganizationsActions.createOrganization, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(
    OrganizationsActions.createOrganizationSuccess,
    (state, { organization }) =>
      organizationsAdapter.addOne(organization, {
        ...state,
        isLoading: false,
        error: null,
      }),
  ),

  on(OrganizationsActions.createOrganizationFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Update Organization
  on(OrganizationsActions.updateOrganization, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(
    OrganizationsActions.updateOrganizationSuccess,
    (state, { organization }) =>
      organizationsAdapter.updateOne(
        { id: organization.id, changes: organization },
        {
          ...state,
          isLoading: false,
          error: null,
        },
      ),
  ),

  on(OrganizationsActions.updateOrganizationFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Delete Organization
  on(OrganizationsActions.deleteOrganization, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(OrganizationsActions.deleteOrganizationSuccess, (state, { id }) =>
    organizationsAdapter.removeOne(id, {
      ...state,
      isLoading: false,
      error: null,
    }),
  ),

  on(OrganizationsActions.deleteOrganizationFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Set Current Organization
  on(
    OrganizationsActions.setCurrentOrganization,
    (state, { organization }) => ({
      ...state,
      currentOrganization: organization,
    }),
  ),

  // Clear Current Organization
  on(OrganizationsActions.clearCurrentOrganization, (state) => ({
    ...state,
    currentOrganization: null,
  })),

  // Clear Error
  on(OrganizationsActions.clearOrganizationsError, (state) => ({
    ...state,
    error: null,
  })),
);
