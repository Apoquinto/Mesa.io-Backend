import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { Section } from './section.entity';
import { DishesModule } from 'src/dishes/dishes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Section]), DishesModule],
  providers: [SectionsService],
  controllers: [SectionsController],
  exports: [SectionsService],
})
export class SectionsModule {}
