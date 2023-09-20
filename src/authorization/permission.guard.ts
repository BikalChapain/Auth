/* eslint-disable prettier/prettier */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  applyDecorators,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EntityManager } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async canActivate(context: ExecutionContext) {
    console.log('context', context);
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    //console.log('permission', permissions);
    if (!permissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      return false;
    }
    console.log('request', request);
    console.log('use', request.user);
    return await this.matchPermission(request.user.id, permissions);
  }

  private async matchPermission(
    userid: string,
    requiredPermissions: string[],
  ): Promise<boolean> {
    console.log('userid', userid, 'requiredPermissions', requiredPermissions);
    const userPermissions = await this.entityManager.query(
      `select u.role as permissions from user u where id=${userid}`,
    );

    if (requiredPermissions[0] == userPermissions[0].permissions) {
      return true;
    } else {
      return false;
    }
    // console.log('userPermission', userPermissions[0].permissions);

    // return isAuthorized;
  }
}

export function Permissions(...permissions: string[]) {
  return applyDecorators(
    SetMetadata('permissions', permissions),
    UseGuards(AuthGuard('jwt'), PermissionsGuard),
    //ApiBearerAuth(),
  );
}
