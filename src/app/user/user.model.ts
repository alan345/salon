// export class User {
//
//   constructor( public address: string) {
//     this.address = address;
//
//   }
// }

import { Form } from '../form/form.model'



export interface User {
  _id: string;
  email: string;
  lastVisit: Date;
  role: string[];
  forms: Form[];
  profile: Profile;
  notes:Note[];
}


export interface Profile {
  name:string;
  isFeatured: boolean;
  lastName: string;
  title:string;
  phoneNumber: string;
  parentUser:User[];
  _profilePicture:Form[];
  hair : {
    hairTexture:string;
    hairCondition:string;
    scalpCondition:string;
  }
}


export interface Note {
    text: string;
    dateNote: Date;
}

export interface Address {
    street: string;
    postcode: string;

}

export const UserConst : User = {
  _id: '',
  lastVisit: new Date,
  email: '',
  profile:{
    parentUser:[],
    isFeatured:false,
    phoneNumber: '',
    name:'',
    lastName:'',
    title:'',
    _profilePicture:[],
    hair:{
      hairCondition : 'Normal',
      scalpCondition : 'Healthy',
      hairTexture : 'Fine',
    }
  },
  notes:[],
  forms:[],
  role:['stylist'],
}
