import { Product } from '../products/product.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/user.entity';

@Entity()
export class Dish extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @Column({ type: 'decimal' })
  servings: number;

  @OneToMany(() => Product, (product: Product) => product.dish)
  products: Product[];

  @ManyToOne(() => User, (user: User) => user.dishes, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column({ type: 'boolean', default: false })
  isPublic: boolean;
}
