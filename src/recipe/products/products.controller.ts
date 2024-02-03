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

@Controller('products')
export class ProductsController {
  private productsService: ProductsService;

  constructor(productsService: ProductsService) {
    this.productsService = productsService;
  }

  @Post()
  createOne(@Body() product: CreateProductDTO) {
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
