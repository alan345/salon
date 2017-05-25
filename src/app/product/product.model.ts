
//import { Categorie } from '../video/video.model'


//
// export class ProductClass implements Product  {
//     _id: string = '';
//     relatedProducts: Product[] = [];
//     description : Description = [];
//     categories: Categorie[] = [];
//     categoriesTag: Categorie[] = [];
//     magento: Magento = ;
//     constructor() {}
// }



export class Product {
  _id: string = '';
  relatedProducts: Product[] = [];
  description: Description;
  categories: Categorie[] = [];
  categoriesTag: Categorie[] = [];
  magento: Magento = new Magento();
  constructor(sanitizer: any) {
    this.description = new Description(sanitizer)
  }
}


export class Description {
  benefitsAndResults: string = '';
  howToApply: string = '';
  activeIngredients: string = '';
  title: Title;
  constructor(sanitizer: any) {
    this.title = new Title(sanitizer);
  }

}

export class Title {
  prononciation: string = '';
  embed: string = '';
  embedSecure: {};
  constructor(sanitizer: any) {
    this.embedSecure = sanitizer.bypassSecurityTrustResourceUrl('')
  }
}

export class Categorie {
  name: string;
  type: string;
}
export class Magento {
  id: string = '';
  sku: string= '';
  name: string= '';
  price: number= 0
  weight: string= '';
  custom_attributes: Custom_attribute[] = [];
}



export class Custom_attribute {
  attribute_code: string;
  value: string;
}
