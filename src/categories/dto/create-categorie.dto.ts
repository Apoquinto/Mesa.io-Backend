import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategorieDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description?: string;
}
