import { Categorie } from '../categorie.entity';

export class UpdateCategorieResponseDTO {
  title: string;
  message: string;
  updatedCategorie: Categorie;
}
