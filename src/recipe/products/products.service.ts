import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async getOneById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id: id,
      },
      relations: ['dish'],
    });
    if (!product) {
      throw new NotFoundException('Not found.');
    }

    return product;
  }

  // getAllForDishId(dishId: number): Promise<Product[]> {
  //   return Product.fin;
  // }

  async create(product: CreateProductDTO): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  read(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['dish'] });
  }

  async update(product: UpdateProductDTO) {
    await this.getOneById(product.id);
    return this.productRepository.update(product.id, product);
  }

  async delete(productId: number): Promise<Product> {
    const productToRemove = await this.getOneById(productId);
    return this.productRepository.remove(productToRemove);
  }
}
