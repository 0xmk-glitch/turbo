import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
} from '@turbo-task-master/api-interfaces';
import { Store } from '@ngrx/store';
import { selectToken } from '../stores/auth/auth.selectors';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http = inject(HttpClient);
  private store = inject(Store);
  private baseUrl = 'http://localhost:3000/tasks';

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

  getTasks(): Observable<Task[]> {
    return this.getAuthHeaders().pipe(
      switchMap((headers) => this.http.get<Task[]>(this.baseUrl, { headers })),
    );
  }

  getTask(id: string): Observable<Task> {
    return this.getAuthHeaders().pipe(
      switchMap((headers) =>
        this.http.get<Task>(`${this.baseUrl}/${id}`, { headers }),
      ),
    );
  }

  createTask(task: CreateTaskDto): Observable<Task> {
    return this.getAuthHeaders().pipe(
      switchMap((headers) =>
        this.http.post<Task>(this.baseUrl, task, { headers }),
      ),
    );
  }

  updateTask(id: string, task: UpdateTaskDto): Observable<Task> {
    return this.getAuthHeaders().pipe(
      switchMap((headers) =>
        this.http.patch<Task>(`${this.baseUrl}/${id}`, task, { headers }),
      ),
    );
  }

  deleteTask(id: string): Observable<void> {
    return this.getAuthHeaders().pipe(
      switchMap((headers) =>
        this.http.delete<void>(`${this.baseUrl}/${id}`, { headers }),
      ),
    );
  }

  // Additional methods for task management
  getTasksByStatus(status: number): Observable<Task[]> {
    return this.getAuthHeaders().pipe(
      switchMap((headers) =>
        this.http.get<Task[]>(`${this.baseUrl}?status=${status}`, { headers }),
      ),
    );
  }

  getTasksByAssignee(assigneeId: string): Observable<Task[]> {
    return this.getAuthHeaders().pipe(
      switchMap((headers) =>
        this.http.get<Task[]>(`${this.baseUrl}?assignedTo=${assigneeId}`, {
          headers,
        }),
      ),
    );
  }

  getTasksByOrganization(organizationId: string): Observable<Task[]> {
    return this.getAuthHeaders().pipe(
      switchMap((headers) =>
        this.http.get<Task[]>(
          `${this.baseUrl}?organizationId=${organizationId}`,
          { headers },
        ),
      ),
    );
  }
}
