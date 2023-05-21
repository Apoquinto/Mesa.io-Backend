import { IsOptional, IsString } from 'class-validator';

export class UpdateMenuDTO {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  description?: string;
}
