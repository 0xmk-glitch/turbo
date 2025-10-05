import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  OrganizationsState,
  organizationsAdapter,
} from './organizations.reducer';

export const selectOrganizationsState =
  createFeatureSelector<OrganizationsState>('organizations');

export const {
  selectAll: selectAllOrganizations,
  selectEntities: selectOrganizationEntities,
  selectIds: selectOrganizationIds,
  selectTotal: selectOrganizationsTotal,
} = organizationsAdapter.getSelectors(selectOrganizationsState);

export const selectOrganizationsLoading = createSelector(
  selectOrganizationsState,
  (state) => state.isLoading,
);

export const selectOrganizationsError = createSelector(
  selectOrganizationsState,
  (state) => state.error,
);

export const selectCurrentOrganization = createSelector(
  selectOrganizationsState,
  (state) => state.currentOrganization,
);

export const selectCurrentOrganizationId = createSelector(
  selectCurrentOrganization,
  (organization) => organization?.id,
);

// Computed selectors
export const selectOrganizationsStats = createSelector(
  selectAllOrganizations,
  (organizations) => ({
    total: organizations.length,
    active: organizations.length, // All organizations are considered active
  }),
);

export const selectOrganizationsByName = createSelector(
  selectAllOrganizations,
  (organizations) => organizations.sort((a, b) => a.name.localeCompare(b.name)),
);
