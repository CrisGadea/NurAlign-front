import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './shared/modules/home/home.component';

import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TherapistCalendarComponent } from './shared/modules/therapist-calendar/therapist-calendar.component';
import { HeaderSessionComponent } from './shared/header-session/header-session.component';
import { FooterSessionComponent } from './shared/footer-session/footer-session.component';
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
