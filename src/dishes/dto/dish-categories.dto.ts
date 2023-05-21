import { IsArray, IsNotEmpty } from 'class-validator';

export class DishCategoriesDTO {
  @IsNotEmpty()
  @IsArray()
  categories: number[];
}
