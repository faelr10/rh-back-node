import {
  Injectable,
  CanActivate,
  ExecutionContext,
  applyDecorators,
  SetMetadata,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../database/client';
import * as base64 from 'base-64';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const tokenBearer = context.switchToHttp().getRequest()
      .headers.authorization;
    if (!tokenBearer) throw new UnauthorizedException('Token is required');

    const tokenDecoded = String(tokenBearer.split(' ')[1]);
    if (tokenDecoded === 'undefined')
      throw new UnauthorizedException('Token is required');

    try {
      const publicKey = base64.decode(process.env.SECRET_PUB_KEY);
      const decoded = Object(
        jwt.verify(tokenDecoded, publicKey, { algorithms: ['RS256'] }),
      );
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (roles.includes(decoded.permission)) return true ? true : false;
    } catch (error) {
      throw new UnauthorizedException('Token is invalid');
    }
  }
}

export function Roles(...roles: string[]) {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(RolesGuard));
}
