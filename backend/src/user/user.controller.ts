import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':username')
  @UseGuards(JwtAuthGuard)
  async getUserByUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @Get('id/:id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: number) {
    return this.userService.findById(id);
  }
}
