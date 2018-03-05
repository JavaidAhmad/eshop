import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private usersService:UsersService, private auth:AuthService,private router:Router){
    auth.user$.subscribe(user=>{

        if(!user) return;
        usersService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');
       
        if(!returnUrl) return;

        localStorage.removeItem('returnUrl');
        router.navigateByUrl(returnUrl);
    });
  }
}
