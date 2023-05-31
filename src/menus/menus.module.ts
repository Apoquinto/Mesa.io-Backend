import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { Menu } from './menu.entity';
import { SectionsModule } from 'src/sections/sections.module';

@Module({
  imports: [TypeOrmModule.forFeature([Menu]), SectionsModule],
  providers: [MenusService],
  controllers: [MenusController],
  exports: [MenusService],
})
export class MenusModule {}
