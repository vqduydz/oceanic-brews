export interface Category {
  id: number;
  name: string;
  slug: string;
  imgUrl: string | null;
  active: boolean;
}

export interface Menu {
  id: number;
  name: string;
  imgUrl: string | null;
  slug: string;
  categoryId: number;
  price: number;
  active: boolean;
  desc?: string;
}

export interface MenuC {
  id: number;
  name: string;
  imgUrl: string | null;
  slug: string;
  categoryId: number;
  price: number;
  active: boolean;
  categoryName: string;
  desc?: string;
}

export interface ResCategory {
  category: Category;
  imgPath: string;
}

export interface ResCategories {
  categories: Category[];
  imgPath: string;
}

export interface CategoryWithMenus extends Category {
  menus: Menu[];
}

export interface ResCategoryWithMenus {
  category: CategoryWithMenus;
  imgPath: string;
}

export interface ResCategoriesWithMenus {
  categories: CategoryWithMenus[];
  imgPath: string;
}

export interface ResMenu {
  menu: Menu;
  imgPath: string;
}

export interface ResMenus {
  menus: Menu[];
  imgPath: string;
}

export interface CurrentUser {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: number;
  gender?: string;
  avatar?: string;
  places?: string;
  active: boolean;
  verified: boolean;
  birthday?: Date;
  favorites?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ResCurrentUser {
  user: CurrentUser;
  imgPath: string;
}

export interface CartItem {
  id: number;
  userId: number;
  menuId: number;
  quantity: number;
}
