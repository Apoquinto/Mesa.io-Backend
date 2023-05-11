import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Dish } from './dish.entity';
import { CreateDishDTO } from './dto/create-dish.dto';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish) private dishRepository: Repository<Dish>,
  ) {}

  createDish(dish: CreateDishDTO): Promise<Dish> {
    const newDish = this.dishRepository.create(dish);
    return this.dishRepository.save(newDish);
  }

  getAllDishes(): Promise<Dish[]> {
    return this.dishRepository.find();
  }

  getDishById(id: number): Promise<Dish> {
    return this.dishRepository.findOne({
      where: {
        id,
      },
    });
  }

  async deleteDish(id: number): Promise<number> {
    await this.dishRepository.delete({ id });
    return id;
  }
}
