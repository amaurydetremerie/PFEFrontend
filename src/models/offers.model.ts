import { NgPluralCase } from '@angular/common';
import { Category } from '../models/category';
import { Types } from './types.model';
import { States } from './states.model';
import { Places } from './places.model';

export interface Offers {
  id: string;
  type: Types;
  state: States;
  deleted: boolean;
  title: string;
  description?: string;
  place: Places;
  price: number;
  seller: string;
  sellerEMail: string;
  countReport: string;
  categoryId: string;
  category: Category;
}
