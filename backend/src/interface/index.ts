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
  phoneNumber?: string;
  gender?: string;
  avatar?: string;
  places?: string;
  role?: string;
  active?: boolean;
  verified?: boolean;
  birthday?: Date;
  favorites?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FavouriteAttributes {
  id?: number;
  userId?: number;
  menuId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartItemAttributes {
  id?: number;
  userId?: number;
  menuId?: number;
  quantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderAttributes {
  id?: number;
  deliverId?: number;
  handlerId?: number;
  paymentMethods?: string;
  orderCode?: string;
  customerId?: number;
  status?: string;
  type?: string;
  payment?: number;
  depositAmount?: number;
  shipFee?: number;
  totalAmount?: number;
  totalPayment?: number;
  items?: string;
  history?: string;
  place?: string;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
