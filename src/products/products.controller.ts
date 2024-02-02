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
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { DishesService } from '../dishes/dishes.service';

@Controller('products')
export class ProductsController {
  private productsService = new ProductsService();

  constructor(private dishesService: DishesService) {}

  @Post()
  createOne(@Body() product: CreateProductDTO) {
    this.dishesService.getOneById(product.dishId);
    return this.productsService.create(product);
  }

  @Get()
  findAll() {
    return this.productsService.read();
  }

  @Put()
  updateOne(@Body() product: UpdateProductDTO) {
    return this.productsService.update(product);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) productId: number) {
    return this.productsService.delete(productId);
  }
}
