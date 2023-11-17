import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../database/models/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) { }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const createdTask = new this.taskModel(createTaskDto);
        return createdTask.save();
    }

    async getAllTasks(): Promise<Task[]> {
        return this.taskModel.find().exec();
    }

    async getTaskById(id: string): Promise<Task> {
        return this.taskModel.findById(id).exec();
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
    }

    async deleteTask(id: string): Promise<Task> {
        return this.taskModel.findByIdAndDelete(id).exec();
    }
}
