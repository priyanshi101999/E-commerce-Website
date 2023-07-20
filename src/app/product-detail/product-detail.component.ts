import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { addProduct, cart } from '../data_type.modal';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  productData: undefined | addProduct
  procuctQuantity: number = 1
  removeCart: boolean | undefined
  cartData: addProduct | undefined
  cartId: number | undefined
  userId: number | any
  constructor(private activeRoute: ActivatedRoute,
    private productService: ProductService,
    ) {

  }

  ngOnInit() {

    //get id from url
    let productId = this.activeRoute.snapshot.paramMap.get('id')

    productId && this.productService.getProduct(productId).subscribe((res) => {
      this.productData = res

    })
    if (localStorage.getItem('localCart')) {
      let cartData = localStorage.getItem('localCart')
      let items = cartData && JSON.parse(cartData)
      console.log(items.length);

      if (productId && items.length > 0) {
        let currentItem = items.filter((item: addProduct) => productId === item.id.toString())

        if (currentItem.length > 0) {
          this.removeCart = true
        } else {
          this.removeCart = false
        }
      }
    }

// get user to show items number in cart
    if (localStorage.getItem('user')) {
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
      this.productService.getCartList(this.userId)
      this.productService.cartData.subscribe((result) => {

        let currentItem = result.filter((item: addProduct) => item.productId?.toString() === productId?.toString())
        console.log(currentItem);

        if (currentItem.length) {
          this.cartData = currentItem[0]
          this.cartId = this.cartData.id
          this.removeCart = true

        }
      })


    }
  }

// function to handle quantity
  handleQuantity(val: string) {
    if (this.procuctQuantity < 20 && val == 'plus') {
      this.procuctQuantity = this.procuctQuantity + 1
    }

    else if (this.procuctQuantity > 1 && val == 'min') {
      this.procuctQuantity = this.procuctQuantity - 1
    }
  }

// function to add item to cart
  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.procuctQuantity
      if (!localStorage.getItem('user')) {
        console.log(this.productData);
        this.productService.localAddToCart(this.productData)
        this.removeCart = true
      }
      else {
      
        let cartData: cart = {
          ...this.productData,
          userId: this.userId,
          productId: this.productData.id

        }

        delete cartData.id

        this.productService.addToCart(cartData).subscribe((result) => {
          alert("Product is added to database")
          if (result) {
            this.productService.getCartList(this.userId)
            this.removeCart = true
          }
        })
      }
    }
  }

  // fuction to remove item from cart
  removeToCart(id: number) {
    if (!localStorage.getItem('user')) {
      this.productService.removeItemFromCart(id)
      this.removeCart = false
    } else {
      console.log(this.cartData);
      console.log(this.cartId);

      this.cartId && this.productService.removeToCart(this.cartId).subscribe((res) => {
        this.removeCart = false
        this.productService.getCartList(this.userId)

      })

    }

  }

}
