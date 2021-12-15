export class InsertOfferModel {
  id = 0;
  type: Types = Types.Give;
  state: States = States.Published;
  deleted = false;
  title: string | undefined;
  description: string | undefined;
  place: Places = Places.Woluwe;
  price = 0;
  categoryId: number | undefined;
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
