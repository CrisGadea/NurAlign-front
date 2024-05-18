import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginService } from './login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],


})
export class LoginComponent {

  constructor(private service: LoginService) { }

  login(){
    let data = {
      email: 'admin',
      password: 'admin'
    }
    this.service.login(data).subscribe((response)=>{
      console.log(response);
      alert(response === true ? 'Login Success' : 'Login Failed');
    },(error)=>{
      console.log(error);
    });
  }


  }
