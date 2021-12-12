export class InsertOfferModel {
  id = 0;
  Type: Types = Types.Give;
  state: States = States.Published;
  title = '';
  deleted = false;
  description = '';
  place: Places = Places.Woluwe;
  price = 0;
  seller = '';
  categoryId = 0;
}

export enum States {
  Published,
  Sell,
  Invisible
}

export enum Types {
  Give,
  Sale,
  Service
}

export enum Places {
  Woluwe,
  Ixelles,
  Louvain
}
