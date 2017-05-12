

export interface Video {
  _id: string;
  title: string;
  embed: string;
  embedSecure: {};
  categories:Categorie[];
  owner: Owner[];
}



export interface Categorie {
  name: string;
  type: string;
}
export interface Owner {
  _id: string;
}
