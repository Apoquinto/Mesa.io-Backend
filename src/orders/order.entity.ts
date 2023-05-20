import { Dish } from 'src/dishes/dish.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'orders'})
export class Order{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId:number;

    @Column()
    dishId:number;

    @Column()
    amount: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    datePurchase: Date


    @ManyToOne(() => Dish, dish => dish.orders)
    @JoinColumn({ name: 'dishId' })
    dish: Dish

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({ name: 'userId' })
    user: User;
} 