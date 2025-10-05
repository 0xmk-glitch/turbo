import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../services/master.service';
import {
  Task,
  TaskStatus,
  TaskType,
  TaskPriority,
} from '@turbo-task-master/api-interfaces';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-task',
  imports: [CommonModule, TableModule, TagModule, ButtonModule],
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

      // this.tasklist = item;
    });
  }
}
