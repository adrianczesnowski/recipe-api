import { Injectable, NotFoundException } from '@nestjs/common';
import { Dish } from './Dish';
import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class DishesService {
  private trackId = 1;

  constructor(private productService: ProductsService) {}

  private dishes: Dish[] = [
    {
      id: this.trackId++,
      name: 'Fish & chips',
      servings: 4,
      description: 'Yummy',
      products: [],
    },
  ];

  getOneById(id: number) {
    const dish = this.dishes.find((d) => d.id === id);
    if (!dish) {
      throw new NotFoundException('Not found');
    }

    return {
      ...dish,
      products: this.productService.getAllForDishId(id),
    };
  }

  create(dish: CreateDishDTO) {
    const newDish: Dish = {
      id: this.trackId++,
      products: [],
      ...dish,
    };
    this.dishes.push(newDish);
  }

  read(): readonly Dish[] {
    return this.dishes.map((d) => {
      return {
        ...d,
        products: this.productService.getAllForDishId(d.id),
      };
    });
  }

  update(dish: UpdateDishDTO) {
    const dishToUpdate = this.getOneById(dish.id);
    Object.assign(dishToUpdate, dish);
  }

  delete(dishId: number) {
    this.getOneById(dishId);
    this.dishes = this.dishes.filter((dishEl) => dishEl.id !== dishId);
  }
}
