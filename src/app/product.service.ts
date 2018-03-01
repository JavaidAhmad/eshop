import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(private db:AngularFireDatabase) { }
  create(product){
    this.db.list('/product').push(product);
  }

  getAll(){
    return this.db.list('/product');
  }
  get(id){
    return this.db.object('/product/'+id);
  }

  updateProduct(id, product){
    return this.db.object('/product/'+id).update(product);
  }

  delete(productId){
    return this.db.object('/product/'+productId).remove();
  }
}
