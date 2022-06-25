import { PrismaClient, User } from '@prisma/client';
import { hash } from 'bcrypt';
import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode } from 'routing-controllers';

import { HttpException } from '../utils/HttpException';
import { isEmpty } from '../utils/util';
import { CreateUser } from '../viewmodels/users.viewmodel';

@Controller()
export class UsersController {
  private user = new PrismaClient().user;

  @Get('/users')
  async getUsers() {
    const findAllUsersData: User[] = await this.user.findMany();
    return { data: findAllUsersData, message: 'findAll' };
  }

  @Get('/users/:id')
  async getUserById(@Param('id') userId: number) {
    const findUser = await this.user.findUnique({
      where: {
        user_id: userId,
      },
    });
    if (!findUser) throw new HttpException(409, "You're not user");

    return { data: findUser, message: 'findOne' };
  }

  @Post('/users')
  @HttpCode(201)
  async createUser(@Body() userData: CreateUser) {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User | null = await this.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (findUser) throw new HttpException(409, `Your email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const saveData = { name: userData.name, email: userData.email, password: hashedPassword };
    const saved = await this.user.create({
      data: saveData,
    });

    return { data: saved, message: 'created' };
  }

  @Put('/users/:id')
  async updateUser(@Param('id') userId: number, @Body() userData: CreateUser) {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User | null = await this.user.findUnique({
      where: {
        user_id: userId,
      },
    });
    if (!findUser) throw new HttpException(409, "You're not user");

    const hashedPassword = await hash(userData.password, 10);
    const user: User = {
      user_id: findUser.user_id,
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    };

    await this.user.update({
      where: {
        user_id: user.user_id,
      },
      data: user,
    });

    const updates = await this.user.findMany();
    return { data: updates, message: 'updated' };
  }

  @Delete('/users/:id')
  async deleteUser(@Param('id') userId: number) {
    const findUser: User | null = await this.user.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (!findUser) throw new HttpException(409, "You're not user");

    const deleteUserData: User = await this.user.delete({
      where: {
        user_id: userId,
      },
    });

    return { data: deleteUserData, message: 'deleted' };
  }
}
