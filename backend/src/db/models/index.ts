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

export { default as Menu } from "./menu";
export { default as Category } from "./category";
