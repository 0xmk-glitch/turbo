import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  Task,
  TaskStatus,
  TaskType,
  TaskPriority,
} from '@turbo-task-master/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private http: HttpClient) {}

  Loadtasks(): Observable<Task[]> {
    // For demo purposes, return sample data
    // In production, this would call the actual API
    const sampleTasks: Task[] = [
      {
        id: '1',
        title: 'Implement user authentication',
        description:
          'Add JWT-based authentication system with role-based access control',
        type: TaskType.WORK,
        status: TaskStatus.TODO,
        priority: TaskPriority.HIGH,
        dueDate: new Date('2024-12-31'),
        createdAt: new Date('2024-12-01'),
        updatedAt: new Date('2024-12-01'),
      },
      {
        id: '2',
        title: 'Design task management UI',
        description:
          'Create responsive dashboard with drag-and-drop functionality',
        type: TaskType.WORK,
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.MEDIUM,
        dueDate: new Date('2024-12-25'),
        createdAt: new Date('2024-11-28'),
        updatedAt: new Date('2024-12-15'),
      },
      {
        id: '3',
        title: 'Write unit tests',
        description: 'Add comprehensive test coverage for all components',
        type: TaskType.WORK,
        status: TaskStatus.DONE,
        priority: TaskPriority.MEDIUM,
        dueDate: new Date('2024-12-20'),
        createdAt: new Date('2024-11-25'),
        updatedAt: new Date('2024-12-18'),
      },
      {
        id: '4',
        title: 'Grocery shopping',
        description: 'Buy ingredients for weekend cooking',
        type: TaskType.PERSONAL,
        status: TaskStatus.TODO,
        priority: TaskPriority.LOW,
        dueDate: new Date('2024-12-22'),
        createdAt: new Date('2024-12-20'),
        updatedAt: new Date('2024-12-20'),
      },
      {
        id: '5',
        title: 'Plan vacation',
        description: 'Research destinations and book flights',
        type: TaskType.PERSONAL,
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.MEDIUM,
        dueDate: new Date('2025-01-15'),
        createdAt: new Date('2024-12-10'),
        updatedAt: new Date('2024-12-18'),
      },
      {
        id: '6',
        title: 'Clean garage',
        description: 'Organize tools and declutter storage space',
        type: TaskType.HOME,
        status: TaskStatus.TODO,
        priority: TaskPriority.LOW,
        dueDate: new Date('2024-12-30'),
        createdAt: new Date('2024-12-19'),
        updatedAt: new Date('2024-12-19'),
      },
      {
        id: '7',
        title: 'Fix leaky faucet',
        description: 'Replace washer in kitchen faucet',
        type: TaskType.HOME,
        status: TaskStatus.DONE,
        priority: TaskPriority.HIGH,
        dueDate: new Date('2024-12-15'),
        createdAt: new Date('2024-12-10'),
        updatedAt: new Date('2024-12-16'),
      },
      {
        id: '8',
        title: 'Code review for PR #123',
        description: 'Review and approve pull request for new feature',
        type: TaskType.WORK,
        status: TaskStatus.TODO,
        priority: TaskPriority.URGENT,
        dueDate: new Date('2024-12-21'),
        createdAt: new Date('2024-12-20'),
        updatedAt: new Date('2024-12-20'),
      },
    ];

    // Return sample data with a small delay to simulate API call
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(sampleTasks);
        observer.complete();
      }, 500);
    });

    // Uncomment this line to use the actual API instead of sample data
    // return this.http.get<CreateTaskDto[]>('http://localhost:3333/tasks');
  }
}
