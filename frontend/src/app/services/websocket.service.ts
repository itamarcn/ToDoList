import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Task } from '../models/task.interface';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  
  constructor(private socket: Socket) {};

  createTask(task: Task): void {
    this.socket.emit('createTask', task);
  }

  updateTask(updatedTask: Task): void {
    this.socket.emit('updateTask', { id: updatedTask._id, updatedTask });
  }

  deleteTask(taskId: string): void {
    this.socket.emit('deleteTask', taskId);
  }

  // listen event
  onFetchTasks(): Observable<Task[]> {
    return this.socket.fromEvent('fetchTasks');
  }
}
