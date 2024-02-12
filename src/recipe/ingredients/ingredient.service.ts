import { Injectable, NotFoundException } from '@nestjs/common';
import { Ingredient } from './dto/ingredient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async findOne(id): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findOne(id);
    if (!ingredient) {
      throw new NotFoundException('Ingredient not found');
    }
    return ingredient;
  }
}
