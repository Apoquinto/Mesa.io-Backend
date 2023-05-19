import { IsOptional, IsString } from 'class-validator';

export class UpdateCategorieDTO {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  description?: string;
}
