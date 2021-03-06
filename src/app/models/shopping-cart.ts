import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';
export class ShoppingCart{

    items:ShoppingCartItem[] = [];

    constructor(public itemsMap:{[productId:string]:ShoppingCartItem}){
        this.itemsMap = itemsMap || {};
        for(let productId in itemsMap){
            let item = itemsMap[productId]; 
            let x = new ShoppingCartItem();
            Object.assign(x,item);
            x.$key = productId;
             this.items.push(x);
        }   
        //console.log('Array of items is:',this.items);
        
    }

    get totalItemsCount(){
        let count = 0;
        for(let productId in this.items)
          count += this.items[productId].quantity;
        
         return count;    
    }


    getQuantity(product:Product){
        let item = this.itemsMap[product.$key];
         return item ? item.quantity:0;
    }
        
    get totalPrice(){
        let sum =0;
        for(let productId in this.items)
        sum += this.items[productId].totalPrice;

        return sum;
    }
}