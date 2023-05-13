import { Categorie } from '../categorie.entity';

export interface DeleteCategorieReponseDTO {
  title: string;
  message: string;
  deleted_categorie: Categorie;
}
