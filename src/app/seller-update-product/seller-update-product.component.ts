import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addProduct } from '../data_type.modal';
import { ProductService } from '../services/product.service'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  updateProductMessage: string | undefined;
  productData: addProduct | any;
  updateProductForm: FormGroup;
  updateMessage: string | undefined
  productId: any

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {

    this.updateProductForm = this.formBuilder.group({
      productName: [''],
      price: [''],
      color: [''],
      category: [''],
      description: [''],
      productURL: ['']

    })
  }


  ngOnInit() {
    this.getProduct();
  }


  //  fuction to get product detail 
  getProduct() {
    this.productId = this.activeRoute.snapshot.paramMap.get('id')
    this.productId && this.productService.getProduct(this.productId).subscribe((res) => {
      this.productData = res;

      if (this.productData) {
        this.updateProductForm = this.formBuilder.group({
          productName: [this.productData.productName],
          price: [this.productData.price],
          color: [this.productData.color],
          category: [this.productData.category],
          description: [this.productData.description],
          productURL: [this.productData.productURL]

        })
      }

    })
  }


  // fuction to update the product
  updateProduct(data: addProduct, productId: any) {
    this.productId = this.activeRoute.snapshot.paramMap.get('id')
    this.productService.updateProduct(data, productId).subscribe((res) => {
      if (res) {
        this.updateMessage = "Product is Updated Successfully"
      }
      setTimeout(() => {
        this.updateMessage = undefined,
          this.router.navigate(['seller-home'])
      }, 3000);
    })
  }
}




