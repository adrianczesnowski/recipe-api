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
  private trackId = 1;
  private products: Product[] = [
    {
      id: this.trackId++,
      name: 'Oats',
      amount: 100,
      unit: 'g',
      dishId: 1,
    },
  ];

  private dishesService: DishesService;

  constructor(
    @Inject(forwardRef(() => DishesService)) dishesService: DishesService,
  ) {
    this.dishesService = dishesService;
  }

  getOneById(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException('Not found.');
    }

    return product;
  }

  getAllForDishId(dishId: number): Product[] {
    return this.products.filter((p) => p.dishId === dishId);
  }

  create(product: CreateProductDTO) {
    const newProduct: Product = {
      id: this.trackId++,
      ...product,
    };
    this.dishesService.getOneById(product.dishId);
    this.products.push(newProduct);
  }

  read(): readonly Product[] {
    return this.products;
  }

  update(product: UpdateProductDTO) {
    const productToUpdate = this.getOneById(product.id);
    Object.assign(productToUpdate, product);
  }

  delete(productId: number) {
    this.getOneById(productId);
    this.products = this.products.filter((p) => p.id !== productId);
  }
}
