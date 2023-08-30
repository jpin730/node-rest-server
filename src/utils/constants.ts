export enum RolesEnum {
  ADMIN = 'ADMIN_ROLE',
  USER = 'USER_ROLE',
}

export const ROLES = Object.values(RolesEnum) as string[];

export const DEFAULT_LIMIT = 5;
export const DEFAULT_OFFSET = 0;

export enum CollectionEnum {
  USERS = 'users',
  CATEGORIES = 'categories',
  PRODUCTS = 'products',
}

export const COLLECTIONS = Object.values(CollectionEnum) as string[];
