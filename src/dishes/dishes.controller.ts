import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateDishDTO } from './dto/create-dish.dto';
import { DishesService } from './dishes.service';
import { Dish } from './dish.entity';
import { UpdateDishDTO } from './dto/update-dish.dto';

@Controller('dishes')
export class DishesController {
  constructor(private dishesService: DishesService) {}

  @Get()
  getDishes(): Promise<Dish[]> {
    return this.dishesService.getAllDishes();
  }

  @Get(':id')
  getDishById(@Param('id', ParseIntPipe) id: number): Promise<Dish> {
    return this.dishesService.getDishById(id);
  }

  @Post()
  createDish(@Body() newDish: CreateDishDTO): Promise<Dish> {
    return this.dishesService.createDish(newDish);
  }

  @Put()
  updateDish(
    @Param('id', ParseIntPipe) id: number,
    @Body() dish: UpdateDishDTO,
  ) {
    return this.dishesService.updateDish(id, dish);
  }

  @Delete(':id')
  deleteDish(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.dishesService.deleteDish(id);
  }
}
