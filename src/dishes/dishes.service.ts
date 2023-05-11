import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
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

  async createDish(dish: CreateDishDTO): Promise<Dish | ConflictException> {
    // Normalize dish name to avoid false unique names
    dish.name = dish.name.toLowerCase().trim();
    const foundDish = await this.getDishByName(dish.name);
    if (foundDish)
      return new ConflictException(
        `Unable to create the dish. The selected name '${dish.name}' is already in use. Please choose a different name for the dish`,
      );
    const newDish = this.dishRepository.create(dish);
    return this.dishRepository.save(newDish);
  }

  getAllDishes(): Promise<Dish[]> {
    return this.dishRepository.find();
  }

  async getDishById(id: number): Promise<Dish | NotFoundException> {
    const dish: Dish | null = await this.dishRepository.findOne({
      where: {
        id,
      },
    });
    if (!dish)
      return new NotFoundException(
        `The requested dish could not be found. Please verify that the ID ${id} is valid and try again.`,
      );
    return dish;
  }

  getDishByName(name: string): Promise<Dish> {
    return this.dishRepository.findOne({
      where: {
        name,
      },
    });
  }

  async checkDishExist(id: number): Promise<boolean> {
    const isExist: Dish | null = await this.dishRepository.findOne({
      where: {
        id,
      },
    });
    return isExist == null ? false : true;
  }

  async updateDish(
    id: number,
    user: UpdateDishDTO,
  ): Promise<number | NotFoundException> {
    if (!(await this.checkDishExist(id)))
      return new NotFoundException(
        `The requested dish could not be found. Please verify that the ID ${id} is valid and try again.`,
      );
    await this.dishRepository.update({ id }, user);
    return id;
  }

  async deleteDish(id: number): Promise<number | NotFoundException> {
    if (!(await this.checkDishExist(id)))
      return new NotFoundException(
        `The requested dish could not be found. Please verify that the ID ${id} is valid and try again.`,
      );
    await this.dishRepository.delete(id);
    return id;
  }
}
