import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../services/master.service';
import {
  Task,
  TaskStatus,
  TaskType,
  TaskPriority,
} from '@turbo-task-master/api-interfaces';
@Component({
  selector: 'app-task',
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TaskComponent implements OnInit {
  tasklist!: Task[];
  constructor(private service: MasterService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.service.Loadtasks().subscribe((item) => {
      console.log(item);
      this.tasklist = item;
    });
  }

  createNewTask() {
    // TODO: Implement create new task functionality
    console.log('Create new task clicked');
  }
}
