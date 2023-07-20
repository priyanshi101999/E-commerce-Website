import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { orderData } from '../data_type.modal';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orderList: orderData[]| undefined

constructor(private productService: ProductService) {}

ngOnInit(){
  this.getOrderList()
}


//function to cancel order
cancelOrder(orderId: number | undefined){
  orderId && this.productService.cancelOrder(orderId).subscribe((result) => {
this.getOrderList()
  })
}


// fuction to update the table
getOrderList(){
  
  this.productService.orderList().subscribe((result) =>
  {    
this.orderList = result
  })
}
}
