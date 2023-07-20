import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { addProduct } from '../data_type.modal';
import { faTrash , faEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
productShop:  addProduct[] = []
deleteMessage: string | undefined = ''
icon= faTrash;
edit= faEdit 


  constructor(private product: ProductService) { }

  ngOnInit() {
this.productList() 
  }

  // fuction to get all product
  productList() { 
    this.product.getProducts().subscribe((res) => {
      this.productShop= res
    })
  }


  // delete fuction to delete product
   deleteProduct(id: number){
    this.product.deleteProduct(id).subscribe((res) => {
      this.productList() 
this.deleteMessage = "Product is Deleted successfully"
    })
    setTimeout(() => {
    this.deleteMessage = undefined},
    3000)
  }

  
}


