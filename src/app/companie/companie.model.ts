import { Form } from '../form/form.model'

export interface Companie {
  _id: string;
  name:string;
  address: Address;
  _users : User[];
  forms : Form[];
}

export interface Address {
  address : '';
  city : '';
  state:'';
  zip:'';
}

export interface User {

}
