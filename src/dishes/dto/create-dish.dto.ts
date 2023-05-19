import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

/**
 * Class representing the data for creating a dish.
 * @class
 */
export class CreateDishDTO {
  /**
   * The name of the dish.
   * @type {string}
   */
  @IsNotEmpty()
  @IsString()
  name: string;
  /**
   * The description of the dish (optional).
   * @type {string | undefined}
   */
  @IsOptional()
  @IsString()
  description?: string;
  /**
   * The price of the dish.
   * @type {number}
   */
  @IsNotEmpty()
  @IsNumber()
  price: number;
  /**
   * The IDs of the categories linked to the dish.
   * @type {number[]}
   */
  @IsNotEmpty()
  @IsArray()
  categories: number[];
}
