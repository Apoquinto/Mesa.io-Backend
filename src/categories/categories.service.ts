import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Categorie } from './categorie.entity';
import { CreateCategorieDTO } from './dto/create-categorie.dto';
import { UpdateCategorieDTO } from './dto/update-categorie.dto';
import { UpdateCategorieResponseDTO } from './dto/update-categorie-response.dto';
import { DeleteCategorieReponseDTO } from './dto/delete-categorie-response.dto';
import { createConflicException } from 'src/shared/exceptions/CreateConflicException';
import { createNotFoundException } from 'src/shared/exceptions/CreateNotFoundException';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categorie)
    private categorieRepository: Repository<Categorie>,
  ) {}

  async createCategorie(
    categorie: CreateCategorieDTO,
  ): Promise<Categorie | ConflictException> {
    categorie.name = categorie.name.toLowerCase().trim();
    const categorieFound = await this.findCategorieByName(categorie.name);
    if (categorieFound)
      return createConflicException('category', 'name', categorie.name);
    const newCategorie = this.categorieRepository.create(categorie);
    return this.categorieRepository.save(newCategorie);
  }

  async findCategorieByName(name: string): Promise<Categorie | null> {
    return this.categorieRepository.findOne({ where: { name } });
  }

  getAllCategories() {
    return this.categorieRepository.find();
  }

  findCategoriesByName(name: string): Promise<Categorie[]> {
    return this.categorieRepository
      .createQueryBuilder()
      .select()
      .where(`name REGEXP '${name}?'`)
      .getMany();
  }

  /**
   * Retrieves categories by their IDs.
   * @param {number[]} ids - An array of category IDs.
   * @returns {Promise<Categorie[]>} A promise that resolves to an array of Category objects.
   */
  findCategoriesByIds(ids: number[]): Promise<Categorie[]> {
    return this.categorieRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async updateCategorie(
    id: number,
    categorie: UpdateCategorieDTO,
  ): Promise<UpdateCategorieResponseDTO | NotFoundException> {
    const categorieFound: Categorie = await this.categorieRepository.findOne({
      where: { id },
    });
    if (!categorieFound) return createNotFoundException('category', id);
    const updatedCategorie = await this.categorieRepository.save({
      ...categorieFound,
      ...categorie,
    });
    return {
      title: 'Updated successfully',
      message: `The category '${id}' has been updated successfully.`,
      updatedCategorie,
    };
  }

  async deleteCategorie(
    id: number,
  ): Promise<DeleteCategorieReponseDTO | NotFoundException> {
    const categorieFound: Categorie = await this.categorieRepository.findOne({
      where: { id },
    });
    if (!categorieFound) return createNotFoundException('category', id);
    const removedCategorie = await this.categorieRepository.remove(
      categorieFound,
    );
    return {
      title: 'Removed successfully',
      message: `The category '${id}' has been deleted successfully.`,
      deleted_categorie: removedCategorie,
    };
  }
}
