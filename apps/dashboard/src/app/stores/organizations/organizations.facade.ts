import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  Organization,
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '@turbo-task-master/api-interfaces';
import * as OrganizationsActions from './organizations.actions';
import * as OrganizationsSelectors from './organizations.selectors';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsFacade {
  private store = inject(Store);

  // Selectors
  organizations$ = this.store.select(
    OrganizationsSelectors.selectAllOrganizations,
  );
  currentOrganization$ = this.store.select(
    OrganizationsSelectors.selectCurrentOrganization,
  );
  currentOrganizationId$ = this.store.select(
    OrganizationsSelectors.selectCurrentOrganizationId,
  );
  isLoading$ = this.store.select(
    OrganizationsSelectors.selectOrganizationsLoading,
  );
  error$ = this.store.select(OrganizationsSelectors.selectOrganizationsError);
  organizationsStats$ = this.store.select(
    OrganizationsSelectors.selectOrganizationsStats,
  );
  organizationsByName$ = this.store.select(
    OrganizationsSelectors.selectOrganizationsByName,
  );

  // Actions
  loadOrganizations(): void {
    this.store.dispatch(OrganizationsActions.loadOrganizations());
  }

  loadOrganization(id: string): void {
    this.store.dispatch(OrganizationsActions.loadOrganization({ id }));
  }

  createOrganization(organization: CreateOrganizationDto): void {
    this.store.dispatch(
      OrganizationsActions.createOrganization({ organization }),
    );
  }

  updateOrganization(id: string, organization: UpdateOrganizationDto): void {
    this.store.dispatch(
      OrganizationsActions.updateOrganization({ id, organization }),
    );
  }

  deleteOrganization(id: string): void {
    this.store.dispatch(OrganizationsActions.deleteOrganization({ id }));
  }

  setCurrentOrganization(organization: Organization): void {
    this.store.dispatch(
      OrganizationsActions.setCurrentOrganization({ organization }),
    );
  }

  clearCurrentOrganization(): void {
    this.store.dispatch(OrganizationsActions.clearCurrentOrganization());
  }

  clearError(): void {
    this.store.dispatch(OrganizationsActions.clearOrganizationsError());
  }
}
