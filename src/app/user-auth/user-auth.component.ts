import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { addProduct, cart, login, SignUp } from '../data_type.modal';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  signUpForm: FormGroup
  loginForm: FormGroup
  showLogin: boolean | undefined
  submitted: boolean | undefined
  loginSubmitted: boolean | undefined
  loginErrorMsg: string | undefined
  userId: number | any
 


  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router,
    private productService: ProductService) {

      // signup form
    this.signUpForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]
      ],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]]
    })

    // login form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]
      ]
    })
  }


  ngOnInit() {
    this.userService.alreadyUser()

  }

//signup fuction
  signUp(val: SignUp) {
    this.submitted = true
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return
    } else if (this.signUpForm.valid) {
      this.userService.userSignUp(val)
      this.localCartToRemoteCart()

    }
  }


  //login fuction
  login(val: SignUp) {
    this.loginSubmitted = true
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return
    } else if (this.loginForm.valid) {
      this.userService.userLogin(val)
      this.userService.invalidUserAuth.subscribe((result) => {
        if (result) {
          this.loginErrorMsg = "Please Enter Valid Email or Password"
        }
        else {
          this.loginErrorMsg = undefined
          this.localCartToRemoteCart()
        }
      })
    }
  }

  openSignUp() {
    this.showLogin = false
  }

  openLogin() {
    this.showLogin = true
  }


  // get login form controls
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }


  // get signup form controls
  get signup(): { [key: string]: AbstractControl } {
    return this.signUpForm.controls;
  }

// fuction to add product to server after user login/signup
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart')
    if (data) {
      this.userService.user.subscribe((result) => {
 this.userId = result[0].id
      })

      let cartDataList: addProduct[] = JSON.parse(data)
      cartDataList.forEach((item: addProduct, index) => {
        let cartData: cart = {
          userId: this.userId,
          ...item,
          productId: item.id
        }

        delete cartData.id


        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((result) => {
            if (result) {
              alert(" local to remote successfully")
            }
          })
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart')
          }

        }, 500)

        setTimeout(() => {
          this.productService.getCartList(this.userId)
        }, 2000)
      })
    }

  }

}


