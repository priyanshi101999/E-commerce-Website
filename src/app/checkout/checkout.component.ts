import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { cart, orderData } from '../data_type.modal';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutForm: any
  totalPrice: number | undefined
  cartList: cart[] | undefined
  orderMsg: string | undefined
  userId: number | undefined
  submitted: boolean = false

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
   ) {


    // chekout form
    this.checkoutForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      contactNo: ['',
        [Validators.required,
        Validators.minLength(10)
        ]
      ]
    })
  }

  ngOnInit() {
    this.productService.currentCart().subscribe((res) => {
      this.cartList = res

      let price = 0
      this.cartList.forEach((item) => {



        if (item.quantity) {

          // formula to get price with quantity
          price = price + (parseInt(item.price) * item.quantity)
        }

      })

      // formula to get total price
      this.totalPrice = price + (price / 5) + (price / 10) + 100;

    })
  }


  // get inputs from  checkout from's form controls
  get f(): { [key: string]: AbstractControl } {
    return this.checkoutForm.controls;
  }

 //function to send the order to server
  orderNow(data: { email: string, address: string, contactNumber: string }) {
    this.submitted = true
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return
    } else if (this.checkoutForm.valid) {
      let user: any = localStorage.getItem('user')
      let userData = JSON.parse(user)
      if (userData) {
        if (userData[0].body) {
          this.userId = userData[0].body.id

        }
        else {
          this.userId = userData[0].id

        }
      }


      if (this.totalPrice) {
        let orderData: orderData = {
          ...data,
          userId: this.userId,
          totalPrice: this.totalPrice,
          id: undefined
        }

        // after order deleting each item from cart
        this.cartList?.forEach((item) => {
          setTimeout(() => {
            item.id && this.productService.deleteCartItems(item.id)
          }, 800)
        })

        //success msg
        this.productService.orderNow(orderData).subscribe((result) => {
          this.orderMsg = " Your Order placed successfully"

          // redirecting to my order page
          setTimeout(() => {
            this.router.navigate(['/my-orders'])
            this.orderMsg = undefined
          }, 4000)

        })
      }

    }
  }
}

