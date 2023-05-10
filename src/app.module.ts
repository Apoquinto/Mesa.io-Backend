import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DishesModule } from './dishes/dishes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MySqlConfigService } from './db/MySqlConfigService';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: MySqlConfigService,
      imports: [ConfigModule]
    }),
    DishesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
