import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { LoginService } from "src/app/core/services/login.service";

@Injectable({
    providedIn: 'root'
  })
  export class LoginGuard implements CanActivate {
  
    constructor(private loginService: LoginService, private router: Router,
        private authService: AuthService) {}
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
      //const isAuthenticated = this.loginService.isAuthenticated(); // Reemplaza esto con tu propia lógica de autenticación
      const isAuthenticated=localStorage.getItem("isAuthenticated");
      if (this.authService.isAuthenticated()) {
        return true;
      } else {
        // Redirige a la página de login si el usuario no está autenticado
        this.router.navigate(['/']);
        window.location.href = '/';
        return false;
      }
    }
  
  }