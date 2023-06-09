// Code based on: https://dev.to/raphael_haecker/nestjs-and-typeorm-database-configuration-15ob
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { Dish } from 'src/dishes/dish.entity';
import { Categorie } from 'src/categories/categorie.entity';
import { User } from 'src/users/user.entity';
import { Menu } from 'src/menus/menu.entity';
import { Section } from 'src/sections/section.entity';
import { Order } from 'src/orders/order.entity';

@Injectable()
export class MySqlConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE'),
      entities: [Dish, Categorie, User, Menu, Section, Order],
      migrations: ['src/db/migration/*{.ts,.js}'],
      synchronize: this.configService.get<boolean>('DEVELOPMENT'),
    };
  }
}
