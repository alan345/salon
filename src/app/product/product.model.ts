
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


export const categHard1Model: any = [
  { name:'All', selected : false },
  { name:'Phyto', selected : false },
  { name:'Phyto Specific', selected : false },
  { name:'Subtil', selected : false }
]

export const categAll: any = [
  { name:'All', selected : false },
]
export const categPhyto: any = [
    { name:'Conditioners & masks', selected : false },
    { name:'Dietary supplements', selected : false },
    { name:'Leave-in care', selected : false },
    { name:'Relaxers', selected : false },
    { name:'Styling', selected : false },
    { name:'Serums', selected : false },
    { name:'Shampoos', selected : false },
    { name:'Treatments', selected : false },
  ]


export const categPhytoSpecific: any = [
   { name:'Treatments', selected : false },
   { name:'Relaxers', selected : false },
   { name:'Stylers', selected : false },
   { name:'Shampoos & Conditioners', selected : false },
   { name:'Kids', selected : false },
]

export const categSubtil: any = [
    { name:'Permanent Color', selected : false },
    { name:'Demi-Permanent Color', selected : false },
    { name:'Temporary Color Enhancing - Direct Pigments', selected : false },
    { name:'Bleaching', selected : false },
    { name:'After-Color Shampoo & Technical', selected : false },
    { name:'Oxydizers & Developer', selected : false },
    { name:'Styling', selected : false },
]


export const categories2DynamicModel = [
    categAll,
    categPhyto,
    categPhytoSpecific,
    categSubtil,
]

export const categories3Model = [
  { name:'COLORED', selected : false},
  { name:'FINE', selected : false },
  { name:'GRAY/PLATINUM', selected : false },
  { name:'CURLY', selected : false },
  { name:'NORMAL', selected : false },
  { name:'RELAXED', selected : false },
  { name:'UNRULY', selected : false },
]

export const categories4Model = [
  { name:'DAMAGED', selected : false},
  { name:'AGING', selected : false },
  { name:'DRY', selected : false },
  { name:'DANDRUFF', selected : false },
  { name:'UNBALANCED SCALP', selected : false },
  { name:'SENSITIVE SCALP', selected : false },
  { name:'THINNING', selected : false },
  { name:'LIFE-STRESSED', selected : false },
]
