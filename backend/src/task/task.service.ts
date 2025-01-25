import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(title: string, description: string, userId: number): Promise<Task> {
    const task = this.taskRepository.create({ title, description, user: { id: userId } });
    return this.taskRepository.save(task);
  }

  async getTasksByUser(userId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { user: { id: userId } } });
  }

  async updateTask(id: number, isCompleted: boolean): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
  
    // Check if the task exists
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }
  
    task.isCompleted = isCompleted;
  
    // Save the updated task
    return this.taskRepository.save(task);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
