import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Dish } from './Dish';
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

    if (!dishToUpdate) {
      throw new HttpException('Dish not found', 404);
    } else {
      Object.assign(dishToUpdate, dish);
    }
    return dishToUpdate;
  }

  @Delete(':id')
  deleteOne(@Param('id') dishId: string) {
    const dishToRemove = this.dishes.find((d) => d.id === Number(dishId));
    if (!dishToRemove) {
      throw new NotFoundException('Dish not found.');
    }
    this.dishes = this.dishes.filter((dishEl) => dishEl.id !== Number(dishId));

    return { dishId };
  }
}
