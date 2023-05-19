import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateDishDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsNumber()
  price?: number;
}
