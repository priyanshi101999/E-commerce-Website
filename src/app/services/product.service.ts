import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { addProduct, cart, orderData } from '../data_type.modal';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<addProduct[] | []>()
  userId: number | undefined

  constructor(private http: HttpClient) { }


  addProduct(data: addProduct) {
    return this.http.post(' http://localhost:3000/comments', data)
  }

  getProducts() {
    return this.http.get<addProduct[]>('  http://localhost:3000/comments')
  }

  deleteProduct(id: number) {
    return this.http.delete<addProduct[]>(`  http://localhost:3000/comments/${id}`)
  }

  getProduct(id: string) {
    return this.http.get<addProduct>(`  http://localhost:3000/comments/${id}`)
  }

  updateProduct(product: addProduct, productId: string) {
    console.log(product);
    return this.http.put<addProduct>(`  http://localhost:3000/comments/${productId}`, product)


  }

  popularProduct() {
    return this.http.get<addProduct[]>('  http://localhost:3000/comments?_limit=3')
  }


  trendyProducts() {
    return this.http.get<addProduct[]>('  http://localhost:3000/comments')
  }

  searchProduct(query: string) {
    return this.http.get<addProduct[]>(` http://localhost:3000/comments?q=${query}`)
  }


  localAddToCart(data: addProduct) {
    let cartData: addProduct[] = []

    let localCart = localStorage.getItem('localCart')
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]))
      this.cartData.emit([data])
    }
    else {

      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData))
    }
    this.cartData.emit(cartData)
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      let items: addProduct[] = JSON.parse(cartData)
      items = items.filter((item: addProduct) => item.id !== productId)
      localStorage.setItem('localCart', JSON.stringify(items))
      this.cartData.emit(items)
    }
  }


  addToCart(cartData: cart) {
    return this.http.post(' http://localhost:3000/cart', cartData)
  }

  getCartList(userId: number) {
    return this.http.get<addProduct[]>(' http://localhost:3000/cart?userId=' + userId,
      { observe: 'response' }).subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body)
        }
      })
  }

  
  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId)
   
  }

  currentCart() {
    let user: any = localStorage.getItem('user')
    let userData = JSON.parse(user)
    if (userData) {
      if (userData[0].body) {
        this.userId = userData[0].body.id
      }
      else {
        this.userId = userData[0].id
      }
    }

    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + this.userId)
  }

  orderNow(data: orderData) {
    return this.http.post('http://localhost:3000/order', data)
  }


  orderList() {
    return this.http.get<orderData[]>('http://localhost:3000/order?userId=' + this.userId)
  }

  deleteCartItems(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId).subscribe((result) => {
      if (result) {
        this.cartData.emit([])
      }
    })

  }

  cancelOrder(orderId: number) {
    return this.http.delete('http://localhost:3000/order/' + orderId)
  }
}  