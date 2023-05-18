import { Categorie } from 'src/categories/categorie.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'dishes' })
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    default:
      'https://res.cloudinary.com/mesa-io/image/upload/v1684348633/default-placeholder_plsxa0.png',
  })
  dishThumbnailURL: string;

  @ManyToMany(() => Categorie)
  @JoinTable()
  categories: Categorie[];
}
