import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Categorie } from 'src/categories/categorie.entity';
import { Section } from 'src/sections/section.entity';

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

  @OneToMany(() => Section, (section) => section.menu)
  sections: Section[];
}
