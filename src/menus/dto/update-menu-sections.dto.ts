import { IsArray, IsNotEmpty } from 'class-validator';

import { Section } from 'src/sections/section.entity';

export class UpdateMenuSectionsDTO {
  @IsArray()
  @IsNotEmpty()
  sections: Section[];
}
