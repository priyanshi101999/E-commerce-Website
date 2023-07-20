import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { addProduct } from '../data_type.modal';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  query: any;
searchResult: undefined | addProduct[]
result:  undefined | addProduct[]

constructor(private activeRoute : ActivatedRoute,
  private productService: ProductService,
 
){}

  ngOnInit(){
    this.activeRoute.paramMap.subscribe(params => {
      this.query = params.get('query');

      this.query && this.productService.searchProduct(this.query).subscribe((res) =>{
        this.result = res
        if(this.result.length > 0 ){
this.searchResult = this.result

        }
        else{
          this.searchResult = undefined
        }
       } )
})
}


}
