// Menu
import { Categorie } from 'src/categories/categorie.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'menu' })
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  order: number;

  @OneToMany(() => Categorie, (categorie) => categorie.menu)
  categories: Categorie[];
}
