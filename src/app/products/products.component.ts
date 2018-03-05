import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {

  products:Product[] = [];
  filteredProducts:Product[] = [];
  cart;
  category:string;
  subscription:Subscription;

  constructor(productsService:ProductService,  route:ActivatedRoute, private cartService:ShoppingCartService) {
    productsService.getAll().switchMap((product) =>{
    
      this.products = product;
      return route.queryParamMap;
    })
    .subscribe(params=>{
      this.category = params.get('category');
      this.filteredProducts = (this.category) ? this.products.filter(p=>p.category === this.category):this.products;
     });


 
  }



  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).subscribe(cart=>this.cart=cart);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
