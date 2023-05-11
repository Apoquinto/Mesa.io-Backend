import { Module } from '@nestjs/common';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dish])],
  controllers: [DishesController],
  providers: [DishesService],
})
export class DishesModule {}
