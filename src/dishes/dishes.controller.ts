import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Dish } from './dish.model';

@Controller('dishes')
export class DishesController {
  trackId = 1;

  dishes: Dish[] = [
    {
      id: this.trackId++,
      name: 'Fish & chips',
      servings: 4,
      description: 'Yummy',
    },
  ];
  @Post()
  createOne(@Body() dish: Dish) {
    dish.id = this.trackId++;
    this.dishes.push(dish);
    return dish;
  }
  @Get()
  findAll(): Dish[] {
    return this.dishes;
  }

  @Put()
  updateOne(@Body() dish: Dish) {
    const dishToUpdate = this.dishes.find((d) => d.id === Number(dish.id));
    if (dishToUpdate) {
      Object.assign(dishToUpdate, dish);
    }
    return dishToUpdate;
  }

  @Delete(':id')
  deleteOne(@Param('id') dishId: string) {
    this.dishes = this.dishes.filter((dishEl) => dishEl.id !== Number(dishId));

    return { dishId };
  }
}
