import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TasksService } from './modules/task/tasks.service';
import { Task } from './task.interface';

@WebSocketGateway()
export class TasksGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  constructor(private readonly taskService: TasksService) { }

  async handleConnection(socket: Socket) {
    this.broadcastTasks();
  }

  async handleDisconnect(socket: Socket) {
    socket.disconnect();
  }

  @SubscribeMessage('fetchTasks')
  async handleFetchTasks() {
    const tasks = await this.taskService.getAllTasks();
    this.server.emit('fetchTasks', tasks);
  }

  @SubscribeMessage('createTask')
  async handleCreateTask(socket: Socket, task: Task) {
    await this.taskService.createTask(task);
    this.broadcastTasks();
  }

  @SubscribeMessage('updateTask')
  async handleUpdateTask(socket: Socket, { id, updatedTask }: { id: string, updatedTask: Task }) {
    await this.taskService.updateTask(id, updatedTask);
    this.broadcastTasks();
  }

  @SubscribeMessage('deleteTask')
  async handleDeleteTask(socket: Socket, taskId: string) {
    await this.taskService.deleteTask(taskId);
    this.broadcastTasks();
  }

  private async broadcastTasks() {
    const tasks = await this.taskService.getAllTasks();
    this.server.emit('fetchTasks', tasks);
  }
}
