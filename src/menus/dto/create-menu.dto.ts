import { IsOptional, IsString } from 'class-validator';

export class CreateMenuDTO {
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description?: string;
}
