import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-header-session',
  templateUrl: './header-session.component.html',
  styleUrls: ['./header-session.component.css'],
  imports:[CommonModule],
  standalone:true
})
export class HeaderSessionComponent {

  constructor(private loginService: LoginService) { }

  logout(){
    this.loginService.logout();
  }

}
