import { Component, OnInit} from '@angular/core';
import { ProductBatchService} from './productBatch.service';
import { ToastsManager} from 'ng2-toastr';
import { MdDialog} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { ProductBatch } from './productBatch.model';
import { EditOptionsComponentDialog } from '../modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-productBatchs',
  templateUrl: './productBatchSingle.component.html',
  styleUrls: ['./productBatch.component.css'],

})

export class ProductBatchSingleComponent implements OnInit {

  urlMagento: string = 'http://52.2.61.43/pub/media/catalog/productBatch';
  fetchedProductBatch: ProductBatch = {
    _id: '',
    categories: [],
    categoriesTag: [],
    description: {
      benefitsAndResults: '',
      howToApply: '',
      activeIngredients: '',
      title : {
        prononciation: '',
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
  };

  categories5 = [
    { name: 'Benefits & Results', selected : false},
    { name: 'How to apply', selected : false },
    { name: 'Active Ingredients', selected : false },

  ]


  categoriesHard2 = [
    // {
    //   name:'whatsnew',
    //   selected : false
    // },
    {
      name:'treatments',
      selected : false
    },
    {
      name:'knowledges',
      selected : false
    },
    {
      name:'testimonials',
      selected : false
    },
    {
      name:'merchandising',
      selected : false
    },
    {
      name:'promotions',
      selected : false
    }
  ]

  categoriesHard1 = [{
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

  inputCategorie = ''



  public myForm: FormGroup;

  constructor(
    private sanitizer: DomSanitizer,
    private productBatchService: ProductBatchService,
    private toastr: ToastsManager,
    public dialog: MdDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
  ) {
  }




  getObjects(myForm){
    //console.log(myForm.get('categories').controls)
     return myForm.get('categories').controls
   }

  ngOnInit() {
    this.myForm = this._fb.group({
      _id: [''],

      categories: this._fb.array([])
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id'])
       this.getProductBatch(params['id'])
    })
  }

  onSelectChange = ($event: any): void => {
    //
  }

  removeCategorie(i: number) {
      this.fetchedProductBatch.categories.splice(i, 1)
      const control = <FormArray>this.myForm.controls['categories'];
      control.removeAt(i);
      let _2this = this
    //  setTimeout(function(){
          _2this.refreshHardCategories()
    //  }, 10);


      //this.updatecategoriesHard2()
  }
  addCategorie() {
    //console.log('addCategorie')
    const control = <FormArray>this.myForm.controls['categories'];
    const addrCtrl = this._fb.group({
        name: [''],
        type:['']
    });
    control.push(addrCtrl);

  }
  addCategorieInput() {
    //console.log('addCategorieInput')
    this.togglCategorieButton(this.inputCategorie, 'tag')
    this.inputCategorie=''
  }
  togglCategorieButton(nameCateg, type) {
    //console.log('togglCategorieButton')
    var indexFound
    this.fetchedProductBatch.categories.forEach((categorie, index) => {
      if(categorie.name == nameCateg)
        indexFound = index
    })

    if(indexFound || indexFound== 0 ) {
      let _2this = this
      setTimeout(function(){
          _2this.removeCategorie(+indexFound)
      }, 10);

    } else {
      this.fetchedProductBatch.categories.push({name:nameCateg, type:type})
      this.addCategorie()
    }
  }


  goBack() {
    this.location.back();
  }
  // openDialogWhereProductBatch(){
  //   let dialogRefDelete = this.dialog.open(ProductBatchWhereDialogComponent)
  //   dialogRefDelete.afterClosed().subscribe(result => {
  //     // if(result) {
  //     //   this.onDelete(this.fetchedProductBatch._id)
  //     //   this.router.navigate(['productBatch']);
  //     // }
  //   })
  // }
  openDialog(positionImage) {
    let dialogRef = this.dialog.open(EditOptionsComponentDialog)
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.fetchedProductBatch[positionImage] = result
      }
    })
  }

  // openDialogDelete(){
  //   let dialogRefDelete = this.dialog.open(ProductBatchDeleteDialog)
  //   dialogRefDelete.afterClosed().subscribe(result => {
  //     if(result) {
  //       this.onDelete(this.fetchedProductBatch._id)
  //       this.router.navigate(['productBatch']);
  //     }
  //   })
  // }

  save(productBatch : ProductBatch) {
    //console.log(this.fetchedProductBatch)
    if(!this.fetchedProductBatch.categories.length){
      this.toastr.error('Error!', 'Please select at least one categorie')
      return
    }

    if(this.fetchedProductBatch._id) {
      this.productBatchService.updateProductBatch(this.fetchedProductBatch)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['productBatch']);
          },
          error => {console.log(error)}
        );
    } else {
      this.productBatchService.saveProductBatch(this.fetchedProductBatch)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.router.navigate(['productBatch']);
          },
          error => {console.log(error)}
        );
    }
  }


  refreshHardCategories(){
    this.categoriesHard2.forEach((HardCategorie, indexHard) => {
      this.categoriesHard2[indexHard].selected = false
    })

    this.categoriesHard2.forEach((HardCategorie, indexHard) => {
      this.fetchedProductBatch.categories.forEach((fetchedCategorie, indexFetched) => {
        if(HardCategorie.name == fetchedCategorie.name) {
          this.categoriesHard2[indexHard].selected = true
        }
      })
    })

    this.categoriesHard1.forEach((HardCategorie, indexHard) => {
      this.categoriesHard1[indexHard].selected = false
    })

    this.categoriesHard1.forEach((HardCategorie, indexHard) => {
      this.fetchedProductBatch.categories.forEach((fetchedCategorie, indexFetched) => {
        if(HardCategorie.name == fetchedCategorie.name) {
          this.categoriesHard1[indexHard].selected = true
        }
      })
    })
  }




  getProductBatch(id : string) {
    this.productBatchService.getProductBatch(id)
      .subscribe(
        res => {

          this.fetchedProductBatch = <ProductBatch>res

        //  this.fetchedProductBatch.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/productBatch/' + res.embed )
          //this.fetchedProductBatch.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('//fast.wistia.net/embed/iframe/' + res.embed)


            this.fetchedProductBatch.description.title.embedSecure = this.sanitizer.bypassSecurityTrustResourceUrl('https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + this.fetchedProductBatch.description.title.embed )

            this.fetchedProductBatch['categoriesTag'] = []
            this.fetchedProductBatch.categories.forEach((categorie) => {
              this.addCategorie()
              if(categorie.type === 'tag') {
                this.fetchedProductBatch['categoriesTag'].push(categorie)
              }
            })
            //this.fetchedProductBatchs.push(productBatch)




          // this.fetchedProductBatch.categories.forEach((categorie) => {
          //   this.addCategorie()
          // })
          this.refreshHardCategories()
        },
        error => {
          console.log(error);
        }
      )
  }

  onDelete(id: string) {
    this.productBatchService.deleteProductBatch(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
        },
        error => {
          console.log(error);
        }
      )
  }
}
