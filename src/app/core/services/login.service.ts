import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.apiUrl;

  // Añade un estado para rastrear si el usuario está autenticado
  private isAuthenticatedStatus: boolean = false;

  constructor(private http:HttpClient, private router: Router,
    private authService: AuthService
  ) { }


  login(data:any){

    return this.http.post<any>(`${this.apiUrl}/therapists/login`, data)
    .pipe(tap((data) => {
      localStorage.setItem('token',data.token);
      const token =data.token;
      const decodedToken: any = jwt_decode(token);
      localStorage.setItem("username", decodedToken.name);
      localStorage.setItem("email",decodedToken.mail);
      localStorage.setItem("userId",decodedToken.id);
      console.log('Carga útil del token decodificada:', decodedToken);
      this.isAuthenticatedStatus = true;
      localStorage.setItem('isAuthenticated', 'true');
    }));
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    this.isAuthenticatedStatus = false;
    localStorage.setItem('isAuthenticated', 'false');
    this.router.navigate(['/']);
  }

  isAuthenticated() {
    // Devuelve el estado de autenticación
    return this.isAuthenticatedStatus;
  }
}

