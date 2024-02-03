import { Product } from '../products/Products';

export interface Dish {
  id: number;
  name: string;
  description?: string;
  servings: number;
  products: Product[];
}
