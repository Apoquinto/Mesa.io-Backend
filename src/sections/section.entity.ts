import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Dish } from 'src/dishes/dish.entity';
import { Menu } from 'src/menus/menu.entity';

@Entity({ name: 'sections' })
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  index: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToMany(() => Dish)
  @JoinTable()
  dishes: Dish[];

  @ManyToOne(() => Menu, (menu) => menu.sections)
  menu: Menu;
}
