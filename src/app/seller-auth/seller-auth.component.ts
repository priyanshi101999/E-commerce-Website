import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
} from '@angular/forms'
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data_type.modal'
import { login } from '../data_type.modal';
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  signUpForm: any;
  loginForm: any;
  logInNow: boolean = false;
  signUpNow: boolean = true;
  errorMsg : any
  

  constructor(private formBuilder: FormBuilder, private seller: SellerService, private router: Router) {
    this.signUpForm = this.formBuilder.group({
      fullName: [''],
      email: [''],
      password: ['']

    })

    this.loginForm = this.formBuilder.group({

      email: [''],
      password: ['']

    })
  }

  ngOnInit(): void {
    this.seller.reLoadSeller();
  }

  signUp(data: SignUp): void {
    console.log(this.signUpForm.value)
    this.seller.sellerSignUp(data)

  }

  login(data: login): void {
    console.log(this.signUpForm.value)
    this.seller.userLogin(data)
  

this.seller.isLoginError.subscribe((isError) =>{
  if(isError){
this.errorMsg =  "Email or Password is not correct"
  }
})
}

  openLogin() {
    this.logInNow = true;
    this.signUpNow = false
  }

  openSignUp() {
    this.signUpNow = true;
    this.logInNow = false;
  }


}

