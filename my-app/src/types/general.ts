export interface User {}

export interface ShopingItem {
  id: number;
  type: string;
  image: string;
  description: string;
  price: string;
  rating: string;
  url: string;
  shopType: string;
}

export interface JobsItem {
  company: string;
  createdAt: string;
  date: string;
  deletedAt: string;
  id: number;
  link: string;
  location: string;
  searchedLocation: string;
  searchedTitle: string;
  title: string;
  updatedAt: string;
}
