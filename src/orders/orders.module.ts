import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { DishesModule } from 'src/dishes/dishes.module';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User]), DishesModule, UsersModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
