import { Injectable, NotFoundException } from '@nestjs/common';
import { Dish } from './Dish';
import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';

@Injectable()
export class DishesService {
  async getOneById(id: number): Promise<Dish> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const dish = await Dish.findOne({ id });
    if (!dish) {
      throw new NotFoundException('Not found');
    }
    return dish;
  }

  create(dish: CreateDishDTO): Promise<Dish> {
    const newDish = new Dish();
    Object.assign(newDish, dish);
    return newDish.save();
  }

  read(): Promise<Dish[]> {
    return Dish.find();
  }

  async update(dish: UpdateDishDTO): Promise<Dish> {
    const dishToUpdate = await this.getOneById(dish.id);
    Object.assign(dishToUpdate, dish);
    return dishToUpdate.save();
  }

  async delete(dishId: number): Promise<Dish> {
    const dishToRemove = await this.getOneById(dishId);
    return dishToRemove.remove();
  }
}
