import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Dish } from './dish.entity';
import { CreateDishDTO } from './dto/create-dish.dto';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish) private dishRepository: Repository<Dish>,
  ) {}

  createDish(dish: CreateDishDTO) {
    const newDish = this.dishRepository.create(dish);
    return this.dishRepository.save(newDish);
  }

  getAllDishes() {
    return this.dishRepository.find();
  }
}
