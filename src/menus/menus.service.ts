import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Menu } from './menu.entity';
import { CreateMenuDTO } from './dto/create-menu.dto';
import { createConflicException } from 'src/shared/exceptions/CreateConflicException';
import { createNotFoundException } from 'src/shared/exceptions/CreateNotFoundException';
import { UpdateMenuDTO } from './dto/update-menu.dto';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private menusRepository: Repository<Menu>,
  ) {}

  async createMenu(menu: CreateMenuDTO): Promise<Menu | ConflictException> {
    const menuFound = await this.menusRepository.findOne({
      where: { name: menu.name },
    });
    if (menuFound) return createConflicException('menu', 'name', menu.name);
    const newMenu = this.menusRepository.create(menu);
    return this.menusRepository.save(newMenu);
  }

  async getMenus(): Promise<Menu[]> {
    return this.menusRepository.find();
  }

  async updateMenu(
    id: number,
    menu: UpdateMenuDTO,
  ): Promise<Menu | NotFoundException> {
    const menuFound = await this.menusRepository.findOne({
      where: { id },
    });
    if (!menuFound) return createNotFoundException('menu', id);
    const updatedMenu = this.menusRepository.save({ ...menuFound, ...menu });
    return updatedMenu;
  }

  async deleteMenu(id: number): Promise<Menu | NotFoundException> {
    const menuFound = await this.menusRepository.findOne({
      where: { id },
    });
    if (!menuFound) return createNotFoundException('menu', id);
    return this.menusRepository.remove(menuFound);
  }
}
