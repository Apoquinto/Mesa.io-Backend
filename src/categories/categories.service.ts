import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Categorie } from './categorie.entity';
import { CreateCategorieDTO } from './dto/create-categorie.dto';

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

  findCategoriesByName(name: string) {
    return this.categorieRepository
      .createQueryBuilder()
      .select()
      .where(`MATCH(name) AGAINST ('${name}' IN BOOLEAN MODE)`)
      .getMany();
  }
}
