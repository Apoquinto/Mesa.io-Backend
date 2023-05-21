import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSectionDTO {
  @IsOptional()
  @IsNumber()
  index?: number;
  @IsOptional()
  @IsString()
  title?: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsArray()
  dishes?: number[];
}
