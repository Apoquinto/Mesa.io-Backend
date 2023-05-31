import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsNumberString,
} from 'class-validator';

export class UpdateDishDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsNumberString()
  price?: number;
  @IsOptional()
  categories?: number[];
}
