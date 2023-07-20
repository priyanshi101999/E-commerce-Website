import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { addProduct } from '../data_type.modal';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  productCarousel: undefined | addProduct[]
  trendyProduct: undefined | addProduct[]
  product: any | addProduct



  constructor(private productService: ProductService,
  ) { }

  ngOnInit() {
    this.productService.popularProduct().subscribe((res) => {
      this.productCarousel = res;
      console.log(this.productCarousel);

      // product to show in carousel
      this.product = [
        this.productCarousel[0],
        this.productCarousel[1],
        this.productCarousel[2]
      ]
    })

  //  to show trendy product
    this.productService.trendyProducts().subscribe((res) => {
      this.trendyProduct = res
      console.log(this.trendyProduct);

    })

  }
}


