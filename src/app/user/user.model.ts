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

  forms: Form[];
  profile: Profile;
  notes:Note[];
}


// export interface Form {
//   _id: string;
//   owner: string;
//   imagePath: string;
// }


export interface Profile {
  title:string;
  name:string;
  _profilePicture:Form;
  hair : {
    hairTexture:string;
    hairDensity:string;
    hairDhairPorosityensity:string;
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
