import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSectionDTO {
  @IsNumber()
  index: number;
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsArray()
  dishes: number[];
}
