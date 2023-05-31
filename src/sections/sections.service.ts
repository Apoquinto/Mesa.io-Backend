import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Section } from './section.entity';
import { CreateSectionDTO } from './dto/create-section.dto';
import { DishesService } from 'src/dishes/dishes.service';
import { UpdateSectionDTO } from './dto/update-section.dto';
import { createNotFoundException } from 'src/shared/exceptions/CreateNotFoundException';
import { Menu } from 'src/menus/menu.entity';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Section)
    private sectionsRepository: Repository<Section>,
    private dishesService: DishesService,
  ) {}

  async getSections(): Promise<Section[]> {
    return this.sectionsRepository.find({
      relations: {
        dishes: true,
      },
    });
  }

  async getSectionsByIds(ids: number[]): Promise<Section[]> {
    return await this.sectionsRepository.find({
      where: { id: In(ids) },
      relations: { dishes: true },
    });
  }

  async createSection(section: CreateSectionDTO): Promise<Section> {
    const newSection = this.sectionsRepository.create({
      ...section,
      dishes: [],
      menu: new Menu(),
    });
    if (section.dishes) {
      newSection.dishes = await this.dishesService.getDishesByIds(
        section.dishes,
      );
    }
    return this.sectionsRepository.save(newSection);
  }

  async createSectionWithMenu(
    section: CreateSectionDTO,
    menu: Menu,
  ): Promise<Section> {
    const newSection = this.sectionsRepository.create({
      ...section,
      dishes: [],
      menu: menu,
    });
    if (section.dishes) {
      newSection.dishes = await this.dishesService.getDishesByIds(
        section.dishes,
      );
    }
    return this.sectionsRepository.save(newSection);
  }

  async updateSection(
    id: number,
    section: UpdateSectionDTO,
  ): Promise<Section | NotFoundException> {
    const sectionFound = await this.sectionsRepository.findOne({
      where: { id },
      relations: {
        dishes: true,
      },
    });
    if (!sectionFound) return createNotFoundException('section', id);
    /* TODO: Improve dishes, only query for missing dishes and filtering removed dishes */
    const updatedDishes = section.dishes
      ? await this.dishesService.getDishesByIds(section.dishes)
      : sectionFound.dishes;
    const updatedSection = this.sectionsRepository.save({
      ...sectionFound,
      ...section,
      dishes: updatedDishes, // Replace dishes ids with dishes entities
    });
    return updatedSection;
  }

  async deleteSection(id: number): Promise<Section | NotFoundException> {
    const sectionFound = await this.sectionsRepository.findOne({
      where: { id },
      relations: {
        dishes: true,
      },
    });
    if (!sectionFound) return createNotFoundException('section', id);
    const deletedSection = await this.sectionsRepository.remove(sectionFound);
    return deletedSection;
  }
}
