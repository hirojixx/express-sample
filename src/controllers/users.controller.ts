import { User } from '@prisma/client';
import userService from '@services/users.service';
import { CreateUser } from '@viewmodels/users.viewmodel';
import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode } from 'routing-controllers';

@Controller()
export class UsersController {
  public userService = new userService();

  @Get('/users')
  async getUsers() {
    const findAllUsersData: User[] = await this.userService.findAllUser();
    return { data: findAllUsersData, message: 'findAll' };
  }

  @Get('/users/:id')
  async getUserById(@Param('id') userId: number) {
    const findOneUserData: User = await this.userService.findUserById(Number(userId));
    return { data: findOneUserData, message: 'findOne' };
  }

  @Post('/users')
  @HttpCode(201)
  async createUser(@Body() userData: CreateUser) {
    const createUserData: User = await this.userService.createUser(userData);
    return { data: createUserData, message: 'created' };
  }

  @Put('/users/:id')
  async updateUser(@Param('id') userId: number, @Body() userData: CreateUser) {
    const updateUserData: User[] = await this.userService.updateUser(userId, userData);
    return { data: updateUserData, message: 'updated' };
  }

  @Delete('/users/:id')
  async deleteUser(@Param('id') userId: number) {
    const deleteUserData: User = await this.userService.deleteUser(userId);
    return { data: deleteUserData, message: 'deleted' };
  }
}
