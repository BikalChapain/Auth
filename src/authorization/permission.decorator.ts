/* eslint-disable prettier/prettier */
// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { UserRoles } from 'src/common/roles.enum';

export const Permissions = (...roles: UserRoles[]) =>
  SetMetadata('roles', roles);
