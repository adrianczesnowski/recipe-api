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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const product = await Product.findOne({ id: id });
    if (!product) {
      throw new NotFoundException('Not found.');
    }

    return product;
  }

  // getAllForDishId(dishId: number): Promise<Product[]> {
  //   return Product.fin;
  // }

  create(product: CreateProductDTO): Promise<Product> {
    const newProduct = new Product();
    Object.assign(newProduct, product);
    return newProduct.save();
  }

  read(): Promise<Product[]> {
    return Product.find();
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
