import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  HttpException,
  Patch,
} from '@nestjs/common';

import { DishesService } from './dishes.service';
import { Dish } from './dish.entity';

import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';
import { DeleteDishReponseDTO } from './dto/delete-dish-response.dto';
import { UpdateDishReponseDTO } from './dto/update-dish-response.dto';
import { DishCategoriesDTO } from './dto/dish-categories.dto';
import { Categorie } from 'src/categories/categorie.entity';

@Controller('dishes')
export class DishesController {
  constructor(private dishesService: DishesService) {}

  @Get()
  getDishes(): Promise<Dish[]> {
    return this.dishesService.getAllDishes();
  }

  @Get(':id')
  getDishById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Dish | HttpException> {
    return this.dishesService.getDishById(id);
  }

  @Get(':id/categories')
  getDishCategories(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Categorie[] | HttpException> {
    return this.dishesService.getCategories(id);
  }

  @Post()
  createDish(@Body() newDish: CreateDishDTO): Promise<Dish | HttpException> {
    return this.dishesService.createDish(newDish);
  }

  @Put(':id')
  updateDish(
    @Param('id', ParseIntPipe) id: number,
    @Body() dish: UpdateDishDTO,
  ): Promise<UpdateDishReponseDTO | HttpException> {
    return this.dishesService.updateDish(id, dish);
  }

  @Patch(':id/categories/add')
  addCategories(
    @Param('id', ParseIntPipe) id: number,
    @Body() dish: DishCategoriesDTO,
  ) {
    return this.dishesService.addCategoriesToDish(id, dish.categories);
  }

  @Patch(':id/categories/remove')
  removeCategories(
    @Param('id', ParseIntPipe) id: number,
    @Body() dish: DishCategoriesDTO,
  ) {
    return this.dishesService.removeCategoriesToDish(id, dish.categories);
  }

  @Patch(':id/categories/update')
  updateCategories(
    @Param('id', ParseIntPipe) id: number,
    @Body() dish: DishCategoriesDTO,
  ) {
    return this.dishesService.updateCategories(id, dish.categories);
  }

  @Delete(':id')
  deleteDish(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteDishReponseDTO | HttpException> {
    return this.dishesService.deleteDish(id);
  }
}
