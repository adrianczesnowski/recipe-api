import { Injectable, NotFoundException } from '@nestjs/common';
import { Dish } from './dish.entity';
import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish) private dishRepository: Repository<Dish>,
  ) {}

  async getOneById(id: number): Promise<Dish> {
    const dish = await this.dishRepository.findOne({
      where: {
        id: id,
      },
      relations: ['products'],
    });
    if (!dish) {
      throw new NotFoundException('Not found');
    }
    return dish;
  }

  create(dish: CreateDishDTO): Promise<Dish> {
    return this.dishRepository.save(dish);
  }

  read(): Promise<Dish[]> {
    return this.dishRepository.find({ relations: ['products'] });
  }

  async update(dish: UpdateDishDTO) {
    await this.getOneById(dish.id);
    return this.dishRepository.update(dish.id, dish);
  }

  async delete(dishId: number): Promise<Dish> {
    const dishToRemove = await this.getOneById(dishId);
    return this.dishRepository.remove(dishToRemove);
  }
}
