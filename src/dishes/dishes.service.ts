import {
  Injectable,
  ConflictException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Dish } from './dish.entity';
import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';
import { UpdateDishReponseDTO } from './dto/update-dish-response.dto';
import { DeleteDishReponseDTO } from './dto/delete-dish-response.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { Categorie } from 'src/categories/categorie.entity';
import { createNotFoundException } from 'src/shared/exceptions/CreateNotFoundException';
import { createConflicException } from 'src/shared/exceptions/CreateConflicException';
import { DishCategoriesDTO } from './dto/dish-categories.dto';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish) private dishRepository: Repository<Dish>,
    @Inject(CategoriesService) private categoriesService: CategoriesService,
  ) {}

  async createDish(dish: CreateDishDTO): Promise<Dish | ConflictException> {
    // Normalize dish name to avoid false unique names
    dish.name = dish.name.toLowerCase().trim();
    const foundDish = await this.getDishByName(dish.name);
    if (foundDish) return createConflicException('dish', 'name', dish.name);
    const categories = await this.categoriesService.findCategoriesByIds(
      dish.categories,
    );
    // Override categories ids with Categories
    const newDish = this.dishRepository.create({ ...dish, categories });
    return this.dishRepository.save(newDish);
  }

  getAllDishes(): Promise<Dish[]> {
    return this.dishRepository.find({
      relations: {
        categories: true,
      },
    });
  }

  async getDishById(id: number): Promise<Dish | NotFoundException> {
    const dish: Dish | null = await this.dishRepository.findOne({
      where: {
        id,
      },
    });
    if (!dish) return createNotFoundException('dish', id);
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

  async addCategoriesToDish(
    id: number,
    categories: number[],
  ): Promise<Dish | ConflictException> {
    const dish: Dish = await this.dishRepository.findOne({
      where: { id },
      relations: {
        categories: true,
      },
    });
    if (!dish) return createNotFoundException('dish', id);
    const currentCategoriesIds: number[] = dish.categories.map(
      (category) => category.id,
    );
    // Search only categories not includes in current categories
    const newCategoriesIds: number[] = categories.filter(
      (category) => !currentCategoriesIds.includes(category),
    );
    const newCategories: Categorie[] =
      await this.categoriesService.findCategoriesByIds(newCategoriesIds);
    // Add left categories to dish
    dish.categories = [...dish.categories, ...newCategories];
    const updatedDish = this.dishRepository.save(dish);

    return updatedDish;
  }

  async removeCategoriesToDish(
    id: number,
    categories: number[],
  ): Promise<Dish | ConflictException> {
    const dish: Dish = await this.dishRepository.findOne({
      where: { id },
      relations: {
        categories: true,
      },
    });
    if (!dish) return createNotFoundException('dish', id);
    dish.categories = dish.categories.filter(
      (category) => !categories.includes(category.id),
    );
    const updatedDish = this.dishRepository.save(dish);

    return updatedDish;
  }

  async updateDish(
    id: number,
    dish: UpdateDishDTO,
  ): Promise<UpdateDishReponseDTO | NotFoundException> {
    if (!(await this.checkDishExist(id))) createNotFoundException('dish', id);
    await this.dishRepository.update({ id }, dish);
    return {
      title: 'Updated successfully',
      message: `The dish '${id}' has been updated successfully.`,
      updated_id: id,
    };
  }

  async deleteDish(
    id: number,
  ): Promise<DeleteDishReponseDTO | NotFoundException> {
    if (!(await this.checkDishExist(id)))
      return createNotFoundException('dish', id);
    await this.dishRepository.delete(id);
    return {
      title: 'Deleted successfully',
      message: `The dish '${id}' has been deleted successfully.`,
      deleted_id: id,
    };
  }
}
