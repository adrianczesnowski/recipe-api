import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from './Products';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  trackId = 1;
  products: Product[] = [];

  @Post()
  createOne(@Body() product: CreateProductDTO) {
    const newProduct: Product = {
      id: this.trackId++,
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  @Get()
  findAll() {
    return this.products;
  }

  @Put()
  updateOne(@Body() product: UpdateProductDTO) {
    const productToUpdate = this.products.find((p) => p.id === product.id);
    if (!productToUpdate) {
      throw new NotFoundException('Product not found');
    } else {
      Object.assign(productToUpdate, product);
    }

    return productToUpdate;
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) productId: number) {
    const productToRemove = this.products.find((p) => p.id === productId);
    if (!productToRemove) {
      throw new NotFoundException('Product not found');
    } else {
      this.products = this.products.filter((p) => p.id !== productId);
    }

    return { productId: productId };
  }
}
