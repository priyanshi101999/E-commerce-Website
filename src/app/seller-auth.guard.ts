import { SellerService } from "./services/seller.service";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SellerAuthGuard {

  constructor(private sellerService: SellerService, private router: Router) { }
  canActivate():
    | Observable<boolean>
    | Promise<boolean>
    | boolean
     {
   
    // logged in, so return true
    return this. sellerService.isLoggedIn;
    
  }
}