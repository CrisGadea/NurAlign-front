import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { LoginComponent } from './shared/modules/login/login.component';
import { RegisterComponent } from './shared/modules/register/register.component';
import { DashboardComponent } from './shared/modules/dashboard/dashboard.component';
import { TherapistCalendarComponent } from './shared/components/therapist-calendar/therapist-calendar.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'Calendar',component:TherapistCalendarComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  {path:'dashboard', component:DashboardComponent},
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
