import { AppUser } from './models/app-user';
import { Observable } from 'rxjs/Observable';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
@Injectable()
export class AdminAuthGuard implements CanActivate{

  constructor(private auth:AuthService, private usersService:UsersService) { }
  canActivate():Observable<boolean>{
    return this.auth.appUser$
    .map(appUser=>appUser.isAdmin);
  } 
}
