
//import { Categorie } from '../video/video.model'






export interface Product {
  _id: string;
  description : Description;
  categories: Categorie[];
  categoriesTag: Categorie[];
  magento: Magento;
}


export interface Description {
  benefitsAndResults: string;
  howToApply: string;
  activeIngredients: string;
  title: Title;
}

export interface Title {
  prononciation : string;
  embed: string;
  embedSecure: {};
}

export interface Categorie {
  name: string;
  type: string;
}
export interface Magento {
  id: string;
  sku: string;
  name: string;
  price: number;
  weight: string;
  custom_attributes: Custom_attribute[];
}



export interface Custom_attribute {
  attribute_code: string;
  value: string;
}

export const ProductConst: Product = {
  _id: '',
  categories: [],
  categoriesTag: [],
  description: {
    benefitsAndResults: '',
    howToApply: '',
    activeIngredients: '',
    title : {
      prononciation : '',
      embed: '',
      embedSecure: this.sanitizer.bypassSecurityTrustResourceUrl(''),
    }
  },
  magento : {
    id: '',
    sku: '',
    name: '',
    price: 0,
    weight: '',
    custom_attributes: [],
  }
}
