import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Organization,
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from '@turbo-task-master/api-interfaces';
import { Store } from '@ngrx/store';
import { selectToken } from '../stores/auth/auth.selectors';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  private http = inject(HttpClient);
  private store = inject(Store);
  private baseUrl = 'http://localhost:3000/api/organizations';

  private getAuthHeaders(): Observable<HttpHeaders> {
    return this.store.select(selectToken).pipe(
      take(1),
      map((token) => {
        let headers = new HttpHeaders();
        if (token) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      }),
    );
  }

  getOrganizations(): Observable<Organization[]> {
    return this.getAuthHeaders().pipe(
      switchMap((headers) =>
        this.http.get<Organization[]>(this.baseUrl, { headers }),
      ),
    );
  }

  getOrganization(id: string): Observable<Organization> {
    return this.getAuthHeaders().pipe(
      switchMap((headers) =>
        this.http.get<Organization>(`${this.baseUrl}/${id}`, { headers }),
      ),
    );
  }

  createOrganization(
    organization: CreateOrganizationDto,
  ): Observable<Organization> {
    return this.getAuthHeaders().pipe(
      switchMap((headers) =>
        this.http.post<Organization>(this.baseUrl, organization, { headers }),
      ),
    );
  }

  updateOrganization(
    id: string,
    organization: UpdateOrganizationDto,
  ): Observable<Organization> {
    return this.getAuthHeaders().pipe(
      switchMap((headers) =>
        this.http.patch<Organization>(`${this.baseUrl}/${id}`, organization, {
          headers,
        }),
      ),
    );
  }

  deleteOrganization(id: string): Observable<void> {
    return this.getAuthHeaders().pipe(
      switchMap((headers) =>
        this.http.delete<void>(`${this.baseUrl}/${id}`, { headers }),
      ),
    );
  }
}
