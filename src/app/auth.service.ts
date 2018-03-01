
import { UsersService } from './users.service';
import { AppUser } from './models/app-user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/observable/of';
@Injectable()
export class AuthService {

  user$:Observable<firebase.User>;
  constructor(private usersService:UsersService,  private afAuth:AngularFireAuth,private route:ActivatedRoute,private router:Router) {
    this.user$ = afAuth.authState;
   }

   login(){
     let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
     localStorage.setItem("returnUrl",returnUrl);
    this.afAuth.auth.signInWithRedirect( new firebase.auth.GoogleAuthProvider);
         
     
   }
   
   logout(){
    this.afAuth.auth.signOut();
   }

   get appUser$() : Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) return this.usersService.get(user.uid);

        return Observable.of(null);
      });    
  }
}
