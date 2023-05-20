import { Controller, Post, Body, HttpException, Get, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order.dto';
import { FilterOrderByDateDTO } from './dto/filter-orderbydate.dto';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { DeleteOrderDTO } from './dto/delete-order.dto';

@Controller('orders')
export class OrdersController {

    constructor(private ordersService: OrdersService){}

    @Post()
    createOrder(@Body() newOrder: CreateOrderDTO) : Promise<Order | HttpException> {
        return this.ordersService.createOrder(newOrder)
    }

    @Post('dates') //Filtra las fechas
    filterOrdersByDateRange(@Body() dates: FilterOrderByDateDTO): Promise <Order[]>{
        return this.ordersService.filterOrdersByDateRange(dates)
    }

    @Get()
    getAllOrders(){
        return this.ordersService.getAllOrders();
    }


    @Get(':id')
    getOrder(@Param('id', ParseIntPipe) id: number): Promise <Order>{
        return this.ordersService.getOrder(id);
    }



    @Delete(':id')
    deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<DeleteOrderDTO | HttpException> {
        return this.ordersService.deleteOrder(id)
    }
}
