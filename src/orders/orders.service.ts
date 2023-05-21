import { ConflictException, Injectable, NotFoundException, Inject, HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { Order } from './order.entity';
import {CreateOrderDTO} from './dto/create-order.dto'
import { FilterOrderByDateDTO } from './dto/filter-orderbydate.dto';
import { DeleteOrderDTO } from './dto/delete-order.dto';
import { Dish } from 'src/dishes/dish.entity';
import { CreateDishDTO } from 'src/dishes/dto/create-dish.dto';
import { DishesService } from 'src/dishes/dishes.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OrdersService {
    
    constructor(
        @InjectRepository(Order) private orderRepository :Repository<Order>,
        private dishesService: DishesService,
        private usersService: UsersService,
    ){}

    async createOrder(order: CreateOrderDTO): Promise<Order| NotFoundException>{
        const dishFound= await this.dishesService.getDishById(order.dishId)
        const userFound= await this.usersService.getUserById(order.userId)

        if(!dishFound){ return new HttpException('Dish not found', HttpStatus.NOT_FOUND)}
        if(!userFound){return new HttpException('User not found', HttpStatus.NOT_FOUND)}

        const dish = await this.dishesService.getDishById(order.dishId);
        const newOrder= this.orderRepository.create({
            ...order, dishName: dish.name
        })
        return this.orderRepository.save(newOrder)

    }
     

    //Funcion que filtra las fechas
    async filterOrdersByDateRange(dates: FilterOrderByDateDTO): Promise<Order[]> {
        const allOrders = await this.getAllOrders();

        const startDate = new Date(dates.startDate);
        const endDate = new Date(dates.endDate);

      
        const filteredOrders = allOrders.filter(order => {
          const orderDate = order.datePurchase;
          return orderDate >= startDate && orderDate <= endDate; 
        });
      
        return filteredOrders;
    }


    async getAllOrders(): Promise<Order[]> {
        return await this.orderRepository.find({
            relations:['dish','user']
        });
    }

    getOrder(id:number){
        return this.orderRepository.findOne({
            where:{
                id:id
            },
            relations:['dish','user']
        })
    }

    async deleteOrder(id: number): Promise <DeleteOrderDTO> {
        await this.orderRepository.delete({id});
        return {
            title: 'Deleted successfully',
            message: `The dish ${id} has been deleted successfully.`,
            deleted_id: id,
          };
    }
}
