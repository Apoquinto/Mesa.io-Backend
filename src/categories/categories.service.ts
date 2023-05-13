import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Categorie } from './categorie.entity';
import { CreateCategorieDTO } from './dto/create-categorie.dto';
import { UpdateCategorieDTO } from './dto/update-categorie.dto';
import { UpdateCategorieResponseDTO } from './dto/update-categorie-response.dto';

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
      return new ConflictException(
        `Unable to create the categorie. The selected name '${categorie.name}' is already in use. Please choose a different name for the categorie`,
      );
    const newCategorie = this.categorieRepository.create(categorie);
    return this.categorieRepository.save(newCategorie);
  }

  async findCategorieByName(name: string): Promise<Categorie | null> {
    return this.categorieRepository.findOne({ where: { name } });
  }

  getAllCategories() {
    return this.categorieRepository.find({});
  }

  findCategoriesByName(name: string): Promise<Categorie[]> {
    return this.categorieRepository
      .createQueryBuilder()
      .select()
      .where(`name REGEXP '${name}?'`)
      .getMany();
  }

  async updateCategorie(
    id: number,
    categorie: UpdateCategorieDTO,
  ): Promise<UpdateCategorieResponseDTO | NotFoundException> {
    const categorieFound: Categorie = await this.categorieRepository.findOne({
      where: { id },
    });
    if (!categorieFound)
      return new NotFoundException(
        `The requested categorie could not be found. Please verify that the Id '${id}' is valid and try again.`,
      );
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
}
