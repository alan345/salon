// export class User {
//
//   constructor( public address: string) {
//     this.address = address;
//
//   }
// }

import { Form } from '../form/form.model'



export class User {
  _id: string = '';
  email: string = '';
  lastVisit: Date = new Date;
  role: string[] = [];
  forms: Form[] = [];
  profile: Profile = new Profile();
  notes: Note[] = [];
  password: string = '';
}


export class Profile {
  name: string = '';
  isFeatured: boolean = false;
  lastName: string = '';
  title: string = '';
  phoneNumber: string = '';
  parentUser:User[] = [];
  _profilePicture:Form[] = [];
  hair : Hair = new Hair();
}

export class Hair {
  hairTexture: string = '';
  hairCondition: string = '';
  scalpCondition: string = '';
}


export interface Note {
    text: string;
    dateNote: Date;
}

export interface Address {
    street: string;
    postcode: string;

}
//
// export const UserConst : User = {
//   _id: '',
//   lastVisit: new Date,
//   email: '',
//   profile:{
//     parentUser:[],
//     isFeatured:false,
//     phoneNumber: '',
//     name: '',
//     lastName: '',
//     title: '',
//     _profilePicture:[],
//     hair:{
//       hairCondition : 'Normal',
//       scalpCondition : 'Healthy',
//       hairTexture : 'Fine',
//     }
//   },
//   notes:[],
//   forms:[],
//   role:['stylist'],
// }
