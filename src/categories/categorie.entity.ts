import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

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
}
