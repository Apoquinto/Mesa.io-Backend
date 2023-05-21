import { Menu } from 'src/menu/menu.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'categories' })
export class Categorie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Index('fulltext_index', { fulltext: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Menu, (menu) => menu.categories)
  menu: Menu;
}
