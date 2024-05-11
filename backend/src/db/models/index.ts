export interface CategoryAttributes {
  id?: number;
  name?: string;
  imgUrl?: string;
  slug?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MenuAttributes {
  id?: number;
  name?: string;
  imgUrl?: string;
  slug?: string;
  categoryId?: number;
  price?: number;
  desc?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserAttributes {
  id?: number;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: number;
  gender?: string;
  avatar?: string;
  places?: string;
  active?: boolean;
  verified?: boolean;
  birthday?: Date;
  accessToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export { default as Menu } from "./menu";
export { default as Category } from "./category";
export { default as User } from "./user";
