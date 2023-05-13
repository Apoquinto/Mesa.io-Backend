import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { Categorie } from './categorie.entity';
import { CreateCategorieDTO } from './dto/create-categorie.dto';
import { UpdateCategorieDTO } from './dto/update-categorie.dto';
import { UpdateCategorieResponseDTO } from './dto/update-categorie-response.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categorieService: CategoriesService) {}

  @Post('')
  createCategorie(
    @Body() newCategorie: CreateCategorieDTO,
  ): Promise<Categorie | HttpException> {
    return this.categorieService.createCategorie(newCategorie);
  }

  @Get('')
  getCategories() {
    return this.categorieService.getAllCategories();
  }

  @Get('/search?')
  searchCategories(@Query('name') name: string) {
    return this.categorieService.findCategoriesByName(name);
  }

  @Put('')
  updateCategorie(
    @Param('id', ParseIntPipe) id: number,
    @Body() categorieUpdated: UpdateCategorieDTO,
  ): Promise<UpdateCategorieResponseDTO | HttpException> {
    return this.categorieService.updateCategorie(id, categorieUpdated);
  }
}
