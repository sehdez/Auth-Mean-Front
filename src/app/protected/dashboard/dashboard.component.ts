import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
    *{
      margin: 15px;
    }
    button{
      color: #fff;
      background: #000;
      cursor: pointer;
      width:20%;
      border-radius:10px;
      padding: 5px;
    }
    button:hover{
      background: #333;
    }
  `]
})
export class DashboardComponent {

  constructor( private router:Router,
               private authService: AuthService ) { }


  get usuario(){
    return this.authService.usuario;
  }
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
