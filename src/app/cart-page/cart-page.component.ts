import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data_type.modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cartList: cart[] | undefined
  userId: number | undefined

  priceSummary: priceSummary = {
    price: 0,
    tax: 0,
    discount: 0,
    delievery: 0,
    total: 0,


  }
  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit() {

    this.loadCartDetail()


  }

  
  checkOut() {
    this.router.navigate(['/checkout'])
  }


  // function to remove item from cart
  removeToCart(id: number | undefined) {
    id && this.productService.removeToCart(id).subscribe((res) => {
      this.loadCartDetail()
    })
    let user: any = localStorage.getItem('user')
    let userData = JSON.parse(user)
    if (userData) {
      if (userData[0].body) {
        this.userId = userData[0].body.id

      }
      else {
        this.userId = userData[0].id

      }
      this.userId && this.productService.getCartList(this.userId)
    }


  }

  // function to create price summary
  loadCartDetail() {
    this.productService.currentCart().subscribe((res) => {
      this.cartList = res

      let price = 0
      this.cartList.forEach((item) => {

        if (item.quantity) {
          price = price + (parseInt(item.price) * item.quantity)
        }

      })

      this.priceSummary.price = price;
      this.priceSummary.tax = price / 5;
      this.priceSummary.discount = price / 10;
      this.priceSummary.delievery = 100;
      this.priceSummary.total = price + (price / 5) + (price / 10) + 100;

      if (!this.cartList.length) {
        this.router.navigate(['/'])
      }
    })
  }

}

