export interface Category {
  id: number;
  name: string;
  slug: string;
  imgUrl: string;
  active: boolean;
}

export interface Menu {
  id: number;
  name: string;
  imgUrl: string;
  slug: string;
  categoryId: number;
  price: number;
  active: boolean;
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
