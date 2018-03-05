import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular5-data-table';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { RouterModule } from '@angular/router';
import { UsersService } from './users.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from './shopping-cart.service';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrderComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule, //for validtion
    DataTableModule, //for table paigination
    AngularFireModule.initializeApp(environment.firbase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CustomFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      //Anonymous user
      {path:"",component:ProductsComponent},
      {path:"login",component:LoginComponent},
      {path:"products", component:ProductsComponent},
      {path:"shopping-cart",component:ShoppingCartComponent},
      //Logged In user
      {path:"check-out",component:CheckOutComponent,canActivate:[AuthGuard]},
      {path:"order-success",component:OrderSuccessComponent,canActivate:[AuthGuard]},
      {path:"my/orders",component:MyOrderComponent,canActivate:[AuthGuard]},
      //Admin
      {path:"admin/products/new",component:ProductFormComponent, canActivate:[AuthGuard,AdminAuthGuard]},
      {path:"admin/products/:id",component:ProductFormComponent, canActivate:[AuthGuard,AdminAuthGuard]},
      {path:"admin/products",component:AdminProductsComponent, canActivate:[AuthGuard,AdminAuthGuard]},
      {path:"admin/orders",component:AdminOrdersComponent, canActivate:[AuthGuard,AdminAuthGuard]},
    ]),
    NgbModule.forRoot(),    
  ],
  providers: [
    AuthService,
    AuthGuard,
    UsersService,
    AdminAuthGuard,
    CategoryService,
    ProductService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
