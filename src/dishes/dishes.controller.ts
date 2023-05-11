import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDishDTO } from './dto/create-dish.dto';
import { DishesService } from './dishes.service';
import { Dish } from './dish.entity';

@Controller('dishes')
export class DishesController {
  constructor(private dishesService: DishesService) {}

  @Get()
  getUsers(): Promise<Dish[]> {
    return this.dishesService.getAllDishes();
  }

  @Post()
  createDish(@Body() newDish: CreateDishDTO): Promise<Dish> {
    return this.dishesService.createDish(newDish);
  }
}
