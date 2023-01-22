import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient, Media as MediaModel } from '@prisma/client';

@Injectable()
export class MediaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async getMediaList(
    take?: number,
    skip?: number,
    searchString?: string,
    orderBy?: 'asc' | 'desc'
  ): Promise<MediaModel[]> {
    const or = searchString
      ? {
          OR: [{ title: { contains: searchString } }]
        }
      : {};

    return this.media.findMany({
      where: {
        ...or
      },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: {
        title: orderBy
      }
    });
  }

  async getMedia(id: number): Promise<MediaModel | null> {
    return this.media.findFirst({
      where: {
        id
      }
    });
  }

  async postMedia(media: MediaModel): Promise<MediaModel> {
    const { title, description, serverId } = media;
    return this.media.create({
      data: {
        title,
        description,
        serverId
      }
    });
  }
}
