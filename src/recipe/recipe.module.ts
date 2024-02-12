import { Module } from '@nestjs/common';
import { DishesController } from './dishes/dishes.controller';
import { ProductsController } from './products/products.controller';
import { DishesService } from './dishes/dishes.service';
import { ProductsService } from './products/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';
import { Dish } from './dishes/dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Dish])],
  controllers: [DishesController, ProductsController],
  providers: [DishesService, ProductsService],
})
export class RecipeModule {}
