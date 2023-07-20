import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms'
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data_type.modal'
import { login } from '../data_type.modal';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  signUpForm: FormGroup;
  loginForm: FormGroup;
  logInNow: boolean = false;
  signUpNow: boolean = true;
  errorMsg: string = ''
  submitted: boolean = false

  constructor(private formBuilder: FormBuilder, private seller: SellerService, private router: Router) {

    // signup form
    this.signUpForm = this.formBuilder.group({
      fullName: ['' , Validators.required],
      email: ['' , [Validators.required, Validators.email]],
      password: ['' , [Validators.required, Validators.minLength(6),
    Validators.maxLength(8)]]

    })


    // login form
    this.loginForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['' , [Validators.required, Validators.minLength(6) , Validators.maxLength(8)]],


    })
  }


  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  get sign(): { [key: string]: AbstractControl } {
    return this.signUpForm.controls;
  }

  ngOnInit(): void {
    this.seller.reLoadSeller();
  }

  //  signup fuction
  signUp(data: SignUp): void {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return
    } else if (this.signUpForm.valid) {
    console.log(this.signUpForm.value)
    this.seller.sellerSignUp(data)
    }
  }

  // login function
  login(data: login): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return
    } else if (this.loginForm.valid) {
      console.log(this.signUpForm.value)
      this.seller.userLogin(data)
    }
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.errorMsg = "Email or Password is not correct"
      }
    })
  }


  //  to open login page
  openLogin() {
    this.logInNow = true;
    this.signUpNow = false
  }

  // to openSignup page
  openSignUp() {
    this.signUpNow = true;
    this.logInNow = false;
  }


}

