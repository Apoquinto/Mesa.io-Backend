/**
 * Class representing the data for creating a dish.
 * @class
 */
export class CreateDishDTO {
  /**
   * The name of the dish.
   * @type {string}
   */
  name: string;
  /**
   * The description of the dish (optional).
   * @type {string | undefined}
   */
  description?: string;
  /**
   * The price of the dish.
   * @type {number}
   */
  price: number;
  /**
   * The IDs of the categories linked to the dish.
   * @type {number[]}
   */
  categories: number[];
}
