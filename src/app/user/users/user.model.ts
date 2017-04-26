// export interface User {
//   _id: string;
//   email: string;
//   role: Array<any>;
//   createdAt: string;
//   updatedAt: string;
//
//   profilePic: string;
//    profile:Profile[];
//   public profile:{
//     name:string;
//     hair:{
//       hairDensity : string;
//       hairPorosity : string;
//       hairTexture : string;
//     }
//   }
//   constructor() {
//     this._id = 'toto'
//     this.profile.name = 'tata'
//
//   }
// }


// export class User {
//   constructor(
//     public email: string;
//     public role: Array<any>;
//     public createdAt: string;
//     public updatedAt: string;
//     public _id: string;
//     public profilePic: string;
//     public profile:{
//       public name:string;
//       public hair:{
//         hairDensity : string;
//         hairPorosity : string;
//         hairTexture : string;
//       }
//     }
//   ) { }
//
// }

// export class User {
//   constructor(
//     public _id: string,
//     // public email: string,
//     // public role: Array<any>,
//     // public createdAt: string,
//     // public updatedAt: string,
//     // public profilePic: string,
//     //public profile:Profile;
//   ) { }
//
// }
//
// export class Profile {
//   constructor(
//     name:string
//   ){}
// }


export interface User {
  _id: string;
  name: string;
  email: string;
  lastVisit: string;
  addresses: Address[];
  forms: Form[];
  profile: Profile;
  notes:Note[];
}


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

export interface Form {
    _id: string;
    owner:string;
    imagePath: string;
}
