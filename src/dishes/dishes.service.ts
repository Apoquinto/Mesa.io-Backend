import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Dish } from './dish.entity';
import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';

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

  async updateDish(id: number, user: UpdateDishDTO): Promise<number> {
    await this.dishRepository.update({ id }, user);
    return id;
  }

  async deleteDish(id: number): Promise<number> {
    await this.dishRepository.delete({ id });
    return id;
  }
}
