import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient, User as UserModel } from '@prisma/client';

@Injectable()
export class UserService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async getUsers(
    take?: number,
    skip?: number,
    searchString?: string,
    orderBy?: 'asc' | 'desc'
  ): Promise<UserModel[]> {
    const or = searchString
      ? {
          OR: [{ name: { contains: searchString } }]
        }
      : {};

    return this.user.findMany({
      where: {
        ...or
      },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: {
        name: orderBy
      }
    });
  }

  async getUser(email: string, pass: string): Promise<UserModel | null> {
    return this.user.findFirst({
      where: {
        email,
        pass
      }
    });
  }

  async postUser(user: UserModel): Promise<UserModel> {
    const { name, email, pass } = user;
    return this.user.create({
      data: {
        name,
        email,
        pass
      }
    });
  }
}
