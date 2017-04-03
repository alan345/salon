export class User {
  id: string;
  _id: string;
  updatedAt: string;
  email:string;
  profile:{
    name:string;
    hair:{
      hairTexture:string;
      hairDensity:string;
    }
  }
}
