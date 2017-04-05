

export interface Promotion {
  name: string;
  email: string;
  addresses: Address[];
  forms: Form[];
  porfile: {
    name:string;
    hair : {
      hairTexture:string;
    }
  }
}

export interface Address {
    street: string;
    postcode: string;
}

export interface Form {
    _id: string;
}
