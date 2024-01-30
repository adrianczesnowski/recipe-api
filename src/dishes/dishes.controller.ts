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
import { UpdateDishDTO } from './dto/update-dish.dto';
import { CreateDishDTO } from './dto/create-dish.dto';

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
  createOne(@Body() dish: CreateDishDTO) {
    const newDish: Dish = {
      id: this.trackId++,
      ...dish,
    };
    this.dishes.push(newDish);
    return newDish;
  }
  @Get()
  findAll(): Dish[] {
    return this.dishes;
  }

  @Put()
  updateOne(@Body() dish: UpdateDishDTO) {
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
