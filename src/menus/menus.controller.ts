import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { MenusService } from './menus.service';
import { Menu } from './menu.entity';
import { CreateMenuDTO } from './dto/create-menu.dto';
import { UpdateMenuDTO } from './dto/update-menu.dto';

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

  @Delete(':id')
  async deleteMenu(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Menu | HttpException> {
    return this.menusService.deleteMenu(id);
  }
}
