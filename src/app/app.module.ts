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
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PacientsComponent } from './shared/modules/pacients/pacients.component';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  
    DashboardComponent,
    
  
    TherapistCalendarComponent,
              PacientsComponent,
       
           
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  HeaderComponent, 
  FooterComponent,
  HeaderSessionComponent,
  FooterSessionComponent,
  MatButtonModule,
   MatDividerModule,
  MatIconModule,
  MatFormFieldModule, 
  MatInputModule, 
  MatSelectModule,
   NoopAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  MatCardModule,
  MatCheckboxModule,

  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
