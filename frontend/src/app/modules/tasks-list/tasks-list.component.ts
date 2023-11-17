import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.interface';
import { TaskFormComponent } from './task-form/task-form.component';
import { WebSocketService } from 'src/app/services/websocket.service';
import { TaskStatus } from 'src/app/enums/task-status.enum';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  public tasks: Task[] = [];
  public taskStatusType: typeof TaskStatus = TaskStatus;

  constructor(private matDialog: MatDialog,
    private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.webSocketService.onFetchTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  public openCreateTaskModal(task?: Task): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '350px';
    dialogConfig.maxHeight = '90vh';
    dialogConfig.autoFocus = true;

    if (task) {
      dialogConfig.data = { task };
    }

    this.matDialog.open(TaskFormComponent, dialogConfig);
  }

  public deleteTask(task: Task): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.webSocketService.deleteTask(task._id ?? '');
    }
  }

  public markTaskAsDone(task: Task): void {
    const updatedTask: Task = {
      ...task,
      status: TaskStatus.DONE
    };

    this.webSocketService.updateTask(updatedTask);
  }
}