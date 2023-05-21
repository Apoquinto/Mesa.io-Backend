import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { MenusService } from './menus.service';
import { Menu } from './menu.entity';
import { CreateMenuDTO } from './dto/create-menu.dto';
import { UpdateMenuDTO } from './dto/update-menu.dto';
import { CreateSectionDTO } from 'src/sections/dto/create-section.dto';
import { Section } from 'src/sections/section.entity';
import { UpdateMenuSectionsDTO } from './dto/update-menu-sections.dto';

@Controller('menus')
export class MenusController {
  constructor(private menusService: MenusService) {}

  @Get('')
  async getMenus(): Promise<Menu[]> {
    return this.menusService.getMenus();
  }

  @Post('')
  async createMenu(
    @Body() newMenu: CreateMenuDTO,
  ): Promise<Menu | HttpException> {
    return this.menusService.createMenu(newMenu);
  }

  @Put(':id')
  async updateMenu(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedMenu: UpdateMenuDTO,
  ): Promise<Menu | HttpException> {
    return this.menusService.updateMenu(id, updatedMenu);
  }

  @Patch(':id/sections/')
  async updateSections(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedSections: UpdateMenuSectionsDTO,
  ): Promise<Menu | HttpException> {
    return this.menusService.updateSections(id, updatedSections.sections);
  }

  @Patch(':id/sections/add')
  async addSection(
    @Param('id', ParseIntPipe) id: number,
    @Body() newSection: CreateSectionDTO,
  ): Promise<Section | HttpException> {
    return this.menusService.addSection(id, newSection);
  }

  @Patch(':id/sections/remove/:sectionId')
  async removeSection(
    @Param('id', ParseIntPipe) id: number,
    @Param('sectionId', ParseIntPipe) sectionId: number,
  ): Promise<Section | HttpException> {
    return this.menusService.deleteSection(id, sectionId);
  }

  @Delete(':id')
  async deleteMenu(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Menu | HttpException> {
    return this.menusService.deleteMenu(id);
  }
}
