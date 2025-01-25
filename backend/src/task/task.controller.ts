import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async createTask(@Body() body: { title: string; description: string; userId: number }) {
    return this.taskService.createTask(body.title, body.description, body.userId);
  }

  @Get(':userId')
  async getTasks(@Param('userId') userId: number) {
    return this.taskService.getTasksByUser(userId);
  }

  @Put(':id')
  async updateTask(@Param('id') id: number, @Body() body: { isCompleted: boolean }) {
    return this.taskService.updateTask(id, body.isCompleted);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }
}
