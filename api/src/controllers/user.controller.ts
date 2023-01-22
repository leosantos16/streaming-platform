import { Controller, Get } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../services/user.service';
import { Body, Post, Query } from '@nestjs/common/decorators';
import { UserDTO, UserMapper } from '../types/user';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userMapper: UserMapper
  ) {}

  @Post('/login')
  async login(@Body() login: UserDTO): Promise<UserDTO> {
    const { email, pass } = login;
    return await this.userService.getUser(email, await bcrypt.hash(pass, 10));
  }

  @Get('/list')
  async list(
    @Query('search') search: string,
    @Query('take') take: number,
    @Query('skip') skip: number,
    @Query('order') order: 'asc' | 'desc'
  ): Promise<UserDTO[]> {
    return await this.userService.getUsers(take, skip, search, order);
  }

  @Post('/register')
  async signup(@Body() user: UserDTO): Promise<UserDTO> {
    return await this.userService.postUser(this.userMapper.toDomain(user));
  }
}
