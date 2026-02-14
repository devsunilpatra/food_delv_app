export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageId?: string;
};

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  address: string;
  deliveryTime: string;
  priceRange: string;
  imageId?: string;
  menu: MenuItem[];
  latitude: number;
  longitude: number;
};

export type CartItem = {
  id: string;
  name:string;
  price: number;
  quantity: number;
  image?: string;
};
