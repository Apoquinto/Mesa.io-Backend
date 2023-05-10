import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'dishes' })
export class Dish {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @Column({ nullable: true })
  description: string

  @Column({ type: 'decimal' })
  price: number

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}