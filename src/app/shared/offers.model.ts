import { NgPluralCase } from '@angular/common';
import { Category } from './category.model';
import { Types } from './types.model';
import { States } from './states.model';
import { Places } from './places.model';

export interface Offers {
  id: number;
  type: Types;
  state: States;
  deleted: boolean;
  title: string;
  description?: string;
  place: Places;
  seller: string;
  countReport: number;
  categoryId: number;
  category: Category;
}
