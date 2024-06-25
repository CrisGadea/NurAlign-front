import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
  
    constructor() { }
  
    private token: string | null = localStorage.getItem('token');
  
    setToken(token: string) {
      this.token = token;
    }
  
    getToken() {
      return this.token;
    }
    isAuthenticated() {
      //console.log(this.getToken())
      return this.token!=""; // Verifica si el token está presente
    }
  }
  