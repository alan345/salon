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
var Product = (function () {
    function Product(sanitizer) {
        this._id = '';
        this.relatedProducts = [];
        this.categories = [];
        this.categoriesTag = [];
        this.magento = new Magento();
        this.description = new Description(sanitizer);
    }
    return Product;
}());
export { Product };
var Description = (function () {
    function Description(sanitizer) {
        this.benefitsAndResults = '';
        this.howToApply = '';
        this.activeIngredients = '';
        this.title = new Title(sanitizer);
    }
    return Description;
}());
export { Description };
var Title = (function () {
    function Title(sanitizer) {
        this.prononciation = '';
        this.embed = '';
        this.embedSecure = sanitizer.bypassSecurityTrustResourceUrl('');
    }
    return Title;
}());
export { Title };
var Categorie = (function () {
    function Categorie() {
    }
    return Categorie;
}());
export { Categorie };
var Magento = (function () {
    function Magento() {
        this.id = '';
        this.sku = '';
        this.name = '';
        this.price = 0;
        this.weight = '';
        this.custom_attributes = [];
    }
    return Magento;
}());
export { Magento };
var Custom_attribute = (function () {
    function Custom_attribute() {
    }
    return Custom_attribute;
}());
export { Custom_attribute };
//# sourceMappingURL=product.model.js.map