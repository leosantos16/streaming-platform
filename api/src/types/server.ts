import { Server } from '@prisma/client';
import { Injectable } from '@nestjs/common';

export interface ServerDTO {
  id?: number;
  address?: string;
  user?: string;
  pass?: string;
  name?: string;
  path?: string;
  active?: boolean;
}

@Injectable()
export class ServerMapper {
  toDomain(server: ServerDTO): Server {
    return {
      id: server.id,
      name: server.name,
      address: server.address,
      active: server.active,
      user: server.user,
      pass: server.pass,
      path: server.path
    };
  }

  toDTO(server: Server): ServerDTO {
    return {
      id: server.id,
      name: server.name,
      address: server.address,
      active: server.active,
      user: server.user,
      pass: server.pass,
      path: server.path
    };
  }
}
