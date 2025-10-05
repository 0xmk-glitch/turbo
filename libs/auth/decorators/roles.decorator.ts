import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@turbo-task-master/auth-shared';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
