import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { addProduct } from '../data_type.modal';
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductForm: any;
  addProductMessage: string | undefined;
  submitted: boolean = false

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService) {

    this.addProductForm = this.formBuilder.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      color: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      productURL: ['', Validators.required]

    })
  }

  ngOnInit() { }

  // to get all formcontrols input
  get f(): { [key: string]: AbstractControl } {
    return this.addProductForm.controls;
  }


  //function to add product
  addProduct(data: addProduct) {
    this.submitted = true;
    if (this.addProductForm.invalid) {
      this.addProductForm.markAllAsTouched();
      return
    }
    else if(this.addProductForm.valid){
    this.productService.addProduct(data).subscribe((res) => {
      if (res) {
        this.addProductMessage = "Product is added successfully"
      }
      setTimeout(() => this.addProductMessage = undefined, 3000)
    })
  }
  }

}
