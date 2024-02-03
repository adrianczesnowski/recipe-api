import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateDishDTO } from './dto/update-dish.dto';
import { CreateDishDTO } from './dto/create-dish.dto';
import { DishesService } from './dishes.service';

@Controller('dishes')
export class DishesController {
  private dishService: DishesService;

  constructor(dishesService: DishesService) {
    this.dishService = dishesService;
  }

  @Post()
  createOne(@Body() dish: CreateDishDTO) {
    return this.dishService.create(dish);
  }
  @Get()
  findAll() {
    return this.dishService.read();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) dishId: number) {
    return this.dishService.getOneById(dishId);
  }

  @Put()
  updateOne(@Body() dish: UpdateDishDTO) {
    return this.dishService.update(dish);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) dishId: number) {
    return this.dishService.delete(dishId);
  }
}
