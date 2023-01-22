import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient, Server as ServerModel } from '@prisma/client';

@Injectable()
export class ServerService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async getServerList(
    take?: number,
    skip?: number,
    searchString?: string,
    orderBy?: 'asc' | 'desc'
  ): Promise<ServerModel[]> {
    const or = searchString
      ? {
          OR: [{ name: { contains: searchString } }]
        }
      : {};

    return this.server.findMany({
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

  async getServer(id: number): Promise<ServerModel | null> {
    return this.server.findFirst({
      where: {
        id
      }
    });
  }

  async postServer(data: ServerModel): Promise<ServerModel> {
    return this.server.create({
      data
    });
  }
}
