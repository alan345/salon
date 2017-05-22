import { Form } from '../form/form.model';
import { User } from '../user/user.model';

export interface Companie {
  _id: string;
  name: string;
  typeCompanie: string;
  phoneNumber: string;
  address: Address;
  _users: User[];
  forms: Form[];
}

export interface Address {
  address: '';
  city: '';
  state: '';
  zip: '';
}
