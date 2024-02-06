import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './Products';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { DishesService } from '../dishes/dishes.service';

@Injectable()
export class ProductsService {
  private dishesService: DishesService;

  constructor(
    @Inject(forwardRef(() => DishesService)) dishesService: DishesService,
  ) {
    this.dishesService = dishesService;
  }

  async getOneById(id: number): Promise<Product> {
    const product = await Product.findOne({
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
    const newProduct = new Product();
    Object.assign(newProduct, product);
    newProduct.dish = await this.dishesService.getOneById(product.dishId);
    return newProduct.save();
  }

  read(): Promise<Product[]> {
    return Product.find({ relations: ['dish'] });
  }

  async update(product: UpdateProductDTO): Promise<Product> {
    const productToUpdate = await this.getOneById(product.id);
    Object.assign(productToUpdate, product);
    return productToUpdate.save();
  }

  async delete(productId: number): Promise<Product> {
    const productToRemove = await this.getOneById(productId);
    return productToRemove.remove();
  }
}
