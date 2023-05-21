import { Dish } from '../dish.entity';

export class PaginateDTO {
  items: Dish[];
  page: number;
  totalItems: number;
}
