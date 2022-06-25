import { PrismaClient, User } from '@prisma/client';
import { HttpException } from '@utils/HttpException';
import { isEmpty } from '@utils/util';
import { CreateUser } from '@viewmodels/users.viewmodel';
import { hash } from 'bcrypt';

class UserService {
  private user = new PrismaClient().user;

  public async findAllUser(): Promise<User[]> {
    const users = await this.user.findMany();
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    const findUser = await this.user.findUnique({
      where: {
        user_id: userId,
      },
    });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUser): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User | null = await this.user.findUnique({
      where: {
        email: userData.email,
      },
    });
    if (findUser) throw new HttpException(409, `Your email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData = { name: 'test', email: userData.email, password: hashedPassword };
    const saved = await this.user.create({
      data: createUserData,
    });

    return saved;
  }

  public async updateUser(userId: number, userData: CreateUser): Promise<User[]> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User | null = await this.user.findUnique({
      where: {
        user_id: userId,
      },
    });
    if (!findUser) throw new HttpException(409, "You're not user");

    const hashedPassword = await hash(userData.password, 10);
    const user: User = {
      ...findUser,
      password: hashedPassword,
    };
    const updateUserData: User = await this.user.update({
      where: {
        user_id: user.user_id,
      },
      data: user,
    });
    const updates = await this.user.findMany();

    return updates;
  }

  public async deleteUser(userId: number): Promise<User> {
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
    return deleteUserData;
  }
}

export default UserService;
