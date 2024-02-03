import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDishDTO {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber({}, { message: 'Servings must be provided.' })
  servings: number;

  @IsOptional()
  @IsString()
  description?: string;
}
