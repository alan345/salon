

export interface Video {
  _id: string;
  title: string;
  embed: string;
  embedSecure: {};
  categories:categorie[];
  owner: Owner[];
}



export interface categorie {
  name: string;
  type: string;
}
export interface Owner {
  _id: string;
}
