import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

export interface UserDTO {
  id?: number;
  name?: string;
  email?: string;
  pass?: string;
  active?: boolean;
}

@Injectable()
export class UserMapper {
  toDomain(user: UserDTO): User {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      pass: user.pass,
      active: user.active
    };
  }

  toDTO(user: User): UserDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      pass: user.pass,
      active: user.active
    };
  }
}
