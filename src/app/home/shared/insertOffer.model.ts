export class InsertOfferModel {
  id = 0;
  type: Types = Types.Give;
  state: States = States.Published;
  deleted = false;
  title = '';
  description = '';
  place: Places = Places.Woluwe;
  price = 0;
  seller = '';
  sellerEMail = '';
  countReport = 0;
  categoryId ? = 0;
}

export enum States {
  Published,
  Sold,
  Invisible
}

export enum Types {
  Give = 'Give',
  Sale = 'Sale',
  Service = 'Service'
}

export enum Places {
  Woluwe,
  Ixelles,
  Louvain
}
