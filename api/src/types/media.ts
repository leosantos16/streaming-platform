import { Media } from '@prisma/client';
import { Injectable } from '@nestjs/common';

export interface MediaDTO {
  id?: number;
  title?: string;
  description?: string;
  serverId?: number;
  active?: boolean;
}

@Injectable()
export class MediaMapper {
  toDomain(media: MediaDTO): Media {
    return {
      id: media.id,
      title: media.title,
      description: media.description,
      serverId: media.serverId,
      active: media.active
    };
  }

  toDTO(media: Media): MediaDTO {
    return {
      id: media.id,
      title: media.title,
      description: media.description,
      serverId: media.serverId,
      active: media.active
    };
  }
}
