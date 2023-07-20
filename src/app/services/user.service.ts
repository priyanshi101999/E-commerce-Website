import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUp, login, } from '../data_type.modal';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private route: Router) { }
  invalidUserAuth = new EventEmitter<boolean>(false)
  user = new EventEmitter<any>()
  userData: SignUp[] = []

  userSignUp(user: SignUp) {
    return this.http.post(' http://localhost:3000/user', user, { observe: 'response' }).subscribe((result) => {
      if (result) {
        localStorage.setItem('user', JSON.stringify([result]))
        this.route.navigate(['/'])
      }
    })
  }

  alreadyUser() {
    if (localStorage.getItem('user')) {
      this.route.navigate(['/'])
    }
  }

  userLogin(data: SignUp) {
    return this.http.get<SignUp[]>(`http://localhost:3000/user?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result) => {

      if (result && result.body && result.body.length) {
        localStorage.setItem('user', JSON.stringify(result.body))
        this.route.navigate(['/'])
        this.invalidUserAuth.emit(false)
        this.user.emit(result.body)

      }
      else {
        this.invalidUserAuth.emit(true)
      }
    })
  }
}
