export interface SignUp {
    "fullName": string,
    "email": string,
    "password": string,
    "id": number
}

export interface login {
    "email": string,
    "password": string
}

export interface addProduct {
    "productName": string,
    "price": string,
    "color": string,
    "category": string,
    "description": string,
    "productURL": string,
    "id": number,
    "productId": number | undefined
    "quantity": undefined | number
}

export interface cart {
    "productName": string,
    "price": string,
    "color": string,
    "category": string,
    "description": string,
    "productURL": string,
    "id": number | undefined
    "productId": number | undefined
    "quantity": undefined | number
    "userId": number | undefined,

}

export interface priceSummary {
    "price": number,
    "tax": number,
    "delievery": number,
    "discount": number,
    "total": number
}

export interface orderData {
totalPrice: number,
email: string,
address: string,
contactNumber: string,
userId: number | undefined
id: number | undefined
}

