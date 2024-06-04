import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TherapistCalendarComponent } from './therapist-calendar/therapist-calendar.component';
import { HeaderVComponent } from './header-v/header-v.component';
import { FooterVComponent } from './footer-v/footer-v.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './side-nav/side-nav.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,

  
  
    TherapistCalendarComponent,
            SideNavComponent,
           
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  HeaderComponent, 
  FooterComponent,
  HeaderVComponent,
  FooterVComponent,
  BrowserAnimationsModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,

  ],
  exports: [  // Exporta el componente aquí si lo necesitas en otro módulo
    LoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
