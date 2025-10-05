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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-create-task',
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ButtonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: 'create-task.component.html',
})
export class CreateTaskComponent implements OnInit {
  tasklist!: Task[];
  constructor(private service: MasterService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.service.Loadtasks().subscribe((item) => {
      console.log(item);

      //this.tasklist = item;
    });
  }
}
