import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { addProduct } from '../data_type.modal';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private route: Router,
    private productService: ProductService,
   

  ) { }
  menutype: string = ''
  sellerName: string = ''
  userName: string = ''
  object: any
  id: any | number
  suggestedResult: undefined | addProduct[]
  cartItems = 0
  

  ngOnInit(): void {


   


    this.route.events.subscribe((val: any) => {
      if (val.url) {

        //seller
        if (localStorage.getItem('seller') && val.url.includes('seller')) {

          this.menutype = "seller"
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller')
            this.sellerName = sellerStore && JSON.parse(sellerStore).body[0].fullName
            console.log(this.sellerName);

          }
        }

        // user
        if (localStorage.getItem('user')) {
          let user: any = localStorage.getItem('user')
          console.log(user);
          let userData = JSON.parse(user)
          
          if (userData) {
            if (userData[0].body) {
              let userId = userData[0].body.id
              this.userName = userData[0].body.fullName
              this.productService.getCartList(userId)

            }
            else {
              let userId = userData[0].id
              this.userName = userData[0].fullName
              this.productService.getCartList(userId)

            }
          }

          this.menutype = "user"
        }

        else {
          this.menutype = "default"

        }
      }
    })

// cartitems to show number of items in cart
    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length

    }
    this.productService.cartData.subscribe((items) => {

      if (items && items.length > 0) {
        this.cartItems = items.length
        console.log(this.cartItems); 
      }
      else {
        this.cartItems = 0
      }
    })
  }


// user logout
  userLogOut() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
    this.productService.cartData.emit([])
    this.cartItems = 0
  }

  
// seller logout
  logOut() {
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }


  // function for search feature
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement


      this.productService.searchProduct(element.value).subscribe((res) => {
        if (res.length > 5) {
          res.length = 5
        }
        this.suggestedResult = res
        console.log(this.suggestedResult)


      })


    }



  }


// to hide when login as seller
  hideSearch() {
    this.suggestedResult = undefined
  }

  
  submitSearch(val: string) {
    this.route.navigate([`search/${val}`])

  }



}





