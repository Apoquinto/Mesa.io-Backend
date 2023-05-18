import {
  Injectable,
  ConflictException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';

import { Dish } from './dish.entity';
import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';
import { UpdateDishReponseDTO } from './dto/update-dish-response.dto';
import { DeleteDishReponseDTO } from './dto/delete-dish-response.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { Categorie } from 'src/categories/categorie.entity';
import { createNotFoundException } from 'src/shared/exceptions/CreateNotFoundException';
import { createConflicException } from 'src/shared/exceptions/CreateConflicException';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryResponse } from 'src/cloudinary/dto/cloudinary.dto';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish) private dishRepository: Repository<Dish>,
    @Inject(CategoriesService) private categoriesService: CategoriesService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async createDish(
    dish: CreateDishDTO,
    dishThumbnail?: Express.Multer.File | undefined,
  ): Promise<Dish | ConflictException> {
    // Normalize dish name to avoid false unique names
    dish.name = dish.name.toLowerCase().trim();
    const foundDish = await this.getDishByName(dish.name);
    if (foundDish) return createConflicException('dish', 'name', dish.name);
    // Validate dish thumbnail
    /* TODO: Improve default dishThumbnail assingment */
    /* TODO: Add image cleaner to reduce dishThumbnail final size */
    let dishThumbnailURL =
      'https://res.cloudinary.com/mesa-io/image/upload/v1684348633/default-placeholder_plsxa0.png';
    if (dishThumbnail) {
      const imageUpload: CloudinaryResponse =
        await this.cloudinaryService.uploadFile(dishThumbnail);
      dishThumbnailURL = imageUpload.url || dishThumbnailURL;
    }
    // Search categories
    const categories = await this.categoriesService.findCategoriesByIds(
      dish.categories,
    );
    // Override categories ids with Categories
    const newDish = this.dishRepository.create({
      ...dish,
      categories,
      dishThumbnailURL,
    });
    return this.dishRepository.save(newDish);
  }

  getDishes(search: string, categories: number[]): Promise<Dish[]> {
    const filters = {};
    if (search) filters['name'] = Like(`%${categories}%`);
    if (categories) filters['categories'] = { id: In(categories) };
    return this.dishRepository.find({
      where: filters,
      relations: {
        categories: true,
      },
    });
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

  async getCategories(id: number): Promise<Categorie[] | NotFoundException> {
    const dish: Dish = await this.dishRepository.findOne({
      where: { id },
      relations: {
        categories: true,
      },
    });
    if (!dish) return createNotFoundException('dish', id);
    return dish.categories;
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
    const missingCategoriesIds: number[] = categories.filter(
      (category) => !currentCategoriesIds.includes(category),
    );
    const missingCategories: Categorie[] =
      await this.categoriesService.findCategoriesByIds(missingCategoriesIds);
    // Add left categories to dish
    dish.categories = [...dish.categories, ...missingCategories];
    const updatedDish = this.dishRepository.save(dish);

    return updatedDish;
  }

  async updateCategories(
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
    // Get current categories
    const currentCategoriesIds: number[] = dish.categories.map(
      (category) => category.id,
    );
    // Add missing categories
    const missingCategoriesIds: number[] = categories.filter(
      (category) => !currentCategoriesIds.includes(category),
    );
    const missingCategories: Categorie[] =
      await this.categoriesService.findCategoriesByIds(missingCategoriesIds);
    // Remove deleted categories
    const removedCategoriesIds: number[] = currentCategoriesIds.filter(
      (category) => !categories.includes(category),
    );
    const filteredCategories = dish.categories.filter(
      (category) => !removedCategoriesIds.includes(category.id),
    );
    // Add filtered and missing categories
    dish.categories = [...filteredCategories, ...missingCategories];
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
