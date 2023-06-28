import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUp, login} from '../data_type.modal'
import { BehaviorSubject } from 'rxjs'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isLoggedIn = new BehaviorSubject<boolean>(false)
  isLoginError = new EventEmitter<boolean>(false) 

  constructor( private http: HttpClient, private router: Router ) { }

sellerSignUp(data: SignUp){
  console.log(data)
  console.log("service called")
return this.http.post(' http://localhost:3000/posts', data).subscribe((result) =>
{
  if(result){
    this.isLoggedIn.next(true)
    localStorage.setItem('seller' , JSON.stringify(result))
    this.router.navigate(['seller-home'])
  }
})
}
 
reLoadSeller()
{
  if(localStorage.getItem('seller')){
  this.isLoggedIn.next(true)
  this.router.navigate(['seller-home'])
  }
}

userLogin(data: login){
 return this.http.get(` http://localhost:3000/posts?email=${data.email}&password=${data.password}` , {observe : 'response'}).subscribe((result: any) => {
  console.log(result)
  if(result && result.body && result.body.length){
    console.log(typeof(result.body.length))
    localStorage.setItem('seller' , JSON.stringify(result))
    this.router.navigate(['seller-home'])
  }
  else{
  this.isLoginError.emit(true)
  }
 })
}
}
