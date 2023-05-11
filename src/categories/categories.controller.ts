import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categorie } from './categorie.entity';
import { CreateCategorieDTO } from './dto/create-categorie.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categorieService: CategoriesService) {}

  @Post('')
  createCategorie(
    @Body() newCategorie: CreateCategorieDTO,
  ): Promise<Categorie | HttpException> {
    return this.categorieService.createCategorie(newCategorie);
  }
}
