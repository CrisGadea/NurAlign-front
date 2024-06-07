import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TherapistCalendarComponent } from './shared/modules/therapist-calendar/therapist-calendar.component';
import { HeaderSessionComponent } from './header-session/header-session.component';
import { FooterSessionComponent } from './footer-session/footer-session.component';
import { DashboardComponent } from './shared/modules/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  
    DashboardComponent,
    
  
    TherapistCalendarComponent
           
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  HeaderComponent, 
  FooterComponent,
  HeaderSessionComponent,
  FooterSessionComponent,

  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
