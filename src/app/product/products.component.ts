import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {ProductService} from './product.service';
//import {RegionComponent} from '../region/region.component';
import {Product} from './product.model';
import {ChangeDetectionStrategy, Input} from "@angular/core";
import {ToastsManager} from 'ng2-toastr';
import {Inject, forwardRef} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser'
import {ViewEncapsulation} from '@angular/core'
import { UserService} from '../user/user.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./product.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ProductsComponent implements OnInit {
  token: string = localStorage.getItem('id_token');
  fetchedProducts : Product[] = [];
  urlMagento = 'http://52.2.61.43/pub/media/catalog/product'
  search = {
    categories : [],
    search:''
  }
  loading: boolean
  //inputSearch:''

  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };

  categories1 = [{
      name:'phyto',
      selected : false
    },
    {
      name:'phytoSpecific',
      selected : false
    },
    {
      name:'subtil',
      selected : false
    }]

  categories2 = ''

  // trackinPage = {
  //   lastVisitPagePressCount:[],
  //   lastVisitPageProductCount:[]
  // }

  constructor(
    private sanitizer: DomSanitizer,
    private productService: ProductService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private userService: UserService,

  ) {
  }


  goBack() {
    this.location.back();
  }

  onSelectChange = ($event: any): void => {
//    console.log($event)
    this.categories2 = $event.tab.textLabel
    this.updateCategerories()
    // this.search.categories = []
    // this.search.categories.push({name:$event.tab.textLabel})
    // this.getProducts(this.paginationData.currentPage, this.search)

  }

  updateCategerories(){
    this.search.categories = []
    this.search.categories.push({name:this.categories2})
    // if(this.inputSearch)
    //   this.search.categories.push({name:this.inputSearch})
    this.categories1.forEach((categorie1)=>{
      if(categorie1.selected == true) {
        this.search.categories.push({name : categorie1.name})
      }
    })
//    console.log(this.search.categories)
    this.fetchedProducts = []
    this.getProducts(1, this.search)
  }

  changeCateg1(nameCateg){
    //this.categories1[nameCateg] = !this.categories1[nameCateg]
    this.categories1.forEach((categ, index)=>{
      if(categ.name === nameCateg) {
        this.categories1[index].selected = !this.categories1[index].selected
      }
    })
    this.updateCategerories()
  }

  addSearchInput(){
//    console.log(this.search.categories)
    this.updateCategerories()
    // this.search.categories.pop()
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


  getProducts(page : number, search) {
    //this.fetchedProducts =[]
    this.loading = true;
    this.productService.getProducts(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          let fetchedProductsNotSecure =  res.data
          fetchedProductsNotSecure.forEach((product) => {
            //isNewProduct = false
            //product['embedSecure'] = this.sanitizer.bypassSecurityTrustResourceUrl('//fast.wistia.net/embed/iframe/' + product['embed'])
            // product['embedSecure'] = this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/product/' + product['embed'] )
            //
            //
            //
            // product['isNewProduct'] = false
            // this.trackinPage.lastVisitPageProductCount.forEach(productNotRead => {
            //     if(productNotRead._id == product._id)
            //       product['isNewProduct'] = true
            // })
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
    // let userId = this.authService.currentUser.userId
    // this.productService.countNewItemForUser()
    // .subscribe(
    //   data => {
    //     this.trackinPage.lastVisitPageProductCount = data.item
    //     this.userService.getUser(userId)
    //     .subscribe(
    //     res => {
    //       res.user.trackinPage.lastVisitPageProduct = new Date()
    //       this.userService.updateUser(res.user)
    //         .subscribe(
    //           res => {},
    //           error => {
    //             console.log(error);
    //           }
    //         )
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //     )
    //
    //   },
    //   error => console.log(error)
    // )
    this.categories2 = 'whatsnew'
    this.updateCategerories()
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}
