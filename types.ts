export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  specs?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export enum Category {
  TOOLS = 'Tools',
  FASTENERS = 'Fasteners',
  FITTINGS = 'Fittings',
  PLUMBING_ELECTRICAL = 'Plumbing & Electrical',
  BUILDING = 'Building Materials',
}