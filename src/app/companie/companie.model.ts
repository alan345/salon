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
}

export class Address {
  address: string = '';
  city: string = '';
  state: string = '';
  zip: string = '';
}


// export const CompanieConst: Companie = {
//   _id: '',
//   forms: [],
//   name: '',
//   typeCompanie: '',
//   phoneNumber: '',
//   address: {
//     address : '',
//     city :  '',
//     state :  '',
//     zip :  ''
//   },
//   _users: []
// };
