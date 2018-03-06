import { Observable } from 'rxjs/Observable';
import { Product } from './models/product';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShoppingCart } from './models/shopping-cart';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  private create(){
    return this.db.list('shopping-carts').push({
      dateCreated:new Date().getTime()
    })
  }

  async getCart():Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
   return this.db.object('/shopping-carts/'+cartId)
   .map(x=> new ShoppingCart(x.items)); 
  }
  private  async getOrCreateCartId(){
    let cartId=localStorage.getItem('cartId');
    
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId',result.key);
    return result.key;

  }
  private getItem(cartId:string,productId:string){
    console.log(cartId+'and '+productId);
    
    return this.db.object('/shopping-carts/'+cartId+'/items/'+ productId);
  }
  async addToCart(product:Product){
    console.log(product);
    
    this.updateItem(product,1);
  }

  async removeFromCart(product:Product){
    this.updateItem(product,-1);
  }
  private async updateItem(product:Product,change){
    let cartId = await this.getOrCreateCartId();
    console.log('card id:',cartId);
    
    let item$ = this.getItem(cartId, product.$key);
    
    
    item$.take(1).subscribe(item=>{
      console.log(item);
      item$.update({ 
        title: product.title,
        imageUrl:product.imgageUrl,
        price:product.price,
        quantity:(item.quantity || 0 ) + change});
    });
  }



}

