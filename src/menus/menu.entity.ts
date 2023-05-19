import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Categorie } from 'src/categories/categorie.entity';

@Entity({ name: 'menus' })
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToMany(() => Categorie)
  @JoinTable()
  categories: Categorie[];
}
