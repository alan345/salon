
//import { Categorie } from '../video/video.model'





export interface Product {
  _id: string;
  categories: Categorie[];
  magento: Magento;
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
