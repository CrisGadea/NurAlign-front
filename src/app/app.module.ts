import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './shared/modules/user/user.component';
import { HomeComponent } from './shared/components/home/home.component';
import { LoginComponent } from './shared/modules/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './shared/modules/register/register.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { TherapistCalendarComponent } from './shared/components/therapist-calendar/therapist-calendar.component';
import { HeaderVComponent } from './shared/components/header-v/header-v.component';
import { FooterVComponent } from './shared/components/footer-v/footer-v.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  
  
    TherapistCalendarComponent,
           
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  HeaderComponent, 
  FooterComponent,
  HeaderVComponent,
  FooterVComponent,

  ],
  exports: [  // Exporta el componente aquí si lo necesitas en otro módulo
    LoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
