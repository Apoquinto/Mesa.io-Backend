import { Body, Controller, Post } from '@nestjs/common';
import { CreateDishDTO } from './dto/create-dish.dto';
import { DishesService } from './dishes.service';

@Controller('dishes')
export class DishesController {
  constructor(private dishesService: DishesService) {}

  @Post()
  createDish(@Body() newDish: CreateDishDTO) {
    return this.dishesService.createDish(newDish);
  }
}
