import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {ProductService} from './product.service';
import {
  Product,
  urlMagentoModel,
  categories3Model,
  categories4Model,
  categories2DynamicModel,
  categHard1Model } from './product.model';
import {ToastsManager} from 'ng2-toastr';
import {MdDialog } from '@angular/material';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import {ViewEncapsulation} from '@angular/core';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./product.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ProductsComponent implements OnInit {
  token: string = localStorage.getItem('id_token');
  fetchedProducts: Product[] = [];

  urlMagento = urlMagentoModel
  search : any = {
    categories : [],
    search:''
  }
  loading: boolean;

  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };


  categoriesHard1 = categHard1Model
  categoriesHard2 : any = []
  categories2Dynamic = categories2DynamicModel
  categories3 = categories3Model
  categories4 = categories4Model
  showFilters: boolean = false
  categories2 = ''
  categories1 = ''



  constructor(
    private sanitizer: DomSanitizer,
    private productService: ProductService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private authService: AuthService,
  ) {
  }


  goBack() {
    this.location.back();
  }

  onSelectChange = ($event: any): void => {
    this.categories3.forEach((categ, index) => {
      this.categories3[index].selected = false
    })

    this.categories4.forEach((categ, index) => {
      this.categories4[index].selected = false
    })



    this.categories2 = $event.tab.textLabel
    this.updateCategerories()
  }

  onSelectChange1 = ($event: any): void => {

    this.categories3.forEach((categ, index) => {
      this.categories3[index].selected = false
    })

    this.categories4.forEach((categ, index) => {
      this.categories4[index].selected = false
    })

    // console.log($event.tab.textLabel)
    // console.log(this.categoriesHard1[2].name)
    if($event.tab.textLabel === this.categoriesHard1[0].name){
      this.categoriesHard2 = this.categories2Dynamic[0]
    }

    if($event.tab.textLabel === this.categoriesHard1[1].name){
      this.categoriesHard2 = this.categories2Dynamic[1]
    }

    if($event.tab.textLabel === this.categoriesHard1[2].name){
      this.categoriesHard2 = this.categories2Dynamic[2]
    }

    if($event.tab.textLabel === this.categoriesHard1[3].name){
      this.categoriesHard2 = this.categories2Dynamic[3]
    }



    this.categories1 = $event.tab.textLabel
    this.categories2 = this.categoriesHard2[0].name
    //console.log(this.categoriesHard2)
    this.updateCategerories()



  }

  updateCategerories() {
    this.search.categories = []
    this.search.categories.push({name:this.categories2})
    this.search.categories.push({name:this.categories1})
    // if(this.inputSearch)
    //   this.search.categories.push({name:this.inputSearch})
    this.categories3.forEach((categorie3) => {
      if(categorie3.selected == true) {
        this.search.categories.push({name : categorie3.name})
      }
    })

    this.categories4.forEach((categorie4)=>{
      if(categorie4.selected == true) {
        this.search.categories.push({name : categorie4.name})
      }
    })

    this.fetchedProducts = []
    this.getProducts(1, this.search)
  }

  changeCateg3(nameCateg : string){
    this.categories3.forEach((categ, index)=>{
      if(categ.name === nameCateg) {
        this.categories3[index].selected = !this.categories3[index].selected
      }
    })
    this.updateCategerories()
  }
  changeCateg4(nameCateg : string){
    this.categories4.forEach((categ, index)=>{
      if(categ.name === nameCateg) {
        this.categories4[index].selected = !this.categories4[index].selected
      }
    })
    this.updateCategerories()
  }

  addSearchInput(){
//    console.log(this.search.categories)
    this.updateCategerories()
    // this.search.categories.pop()
  }
  toogleFilters() {
    this.showFilters = !this.showFilters
  }
  onDelete(id: string) {
    this.productService.deleteProduct(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }

  // getPage(page: number) {
  //   this.getProducts(page, this.search);
  // }


  loadMore(){
    this.paginationData.currentPage = this.paginationData.currentPage+1
    this.getProducts(this.paginationData.currentPage, this.search)
  }



  getProducts(page : number, search: any) {
    //this.fetchedProducts =[]
    this.loading = true;
    this.productService.getProducts(page, search)
      .subscribe(
        res => {
          if(page === 1)
            this.fetchedProducts =[]
          this.paginationData = res.paginationData;
          let fetchedProductsNotSecure =  res.data
          fetchedProductsNotSecure.forEach((product: Product) => {
            product['categoriesTag'] = []
            product.categories.forEach((categorie: any) => {
              if(categorie.type === 'tag') {
                product['categoriesTag'].push(categorie)
              }
            })
            this.fetchedProducts.push(product)
          })
          this.loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }

  ngOnInit() {
    this.categoriesHard2 = this.categories2Dynamic[0]
    this.categories1 = this.categoriesHard1[0].name
    this.categories2 = this.categoriesHard2[0].name
    this.updateCategerories()
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}
