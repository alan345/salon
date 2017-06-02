import { Form } from '../form/form.model';
import { User } from '../user/user.model';

export class Companie {
  _id: string = '';
  name: string = '';
  typeCompanie: string = '';
  phoneNumber: string= '';
  address: Address = new Address();
  _users: User[] = [];
  forms: Form[] = [];
  magento: Magento = new Magento();
}

export class Magento {
  id: string = '';
  group_id: number = 0;
  created_at: Date = new Date;
  updated_at: Date = new Date;
  created_in: string = '';
  email: string = '';
  firstname: string = '';
  lastname: string = '';
  gender: number = 0;
  store_id: number = 0;
  website_id: number = 0;
  addresses: AddressMagento[];
}

export class AddressMagento {
    id: string = '';
    customer_id: string = '';
    region: RegionMagento = new RegionMagento();
    region_id: number = 0;
    country_id: string = '';
    street: string = '';
    telephone: string = '';
    postcode: string = '';
    city: string = '';
    firstname: string = '';
    lastname: string = '';
  }
export class RegionMagento {
    region_code: string = '';
    region: string = '';
    region_id: number = 0;
}
export class Address {
  address: string = '';
  city: string = '';
  state: string = '';
  zip: string = '';
}
