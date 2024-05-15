import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
<<<<<<< HEAD
import { DashboardComponent } from './dashboard/dashboard.component';
=======
import { TherapistCalendarComponent } from './therapist-calendar/therapist-calendar.component';
>>>>>>> b6a9a23 (generate new component calendar)

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
