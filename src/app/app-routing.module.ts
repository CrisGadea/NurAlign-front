import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/modules/home/home.component';

import { DashboardComponent } from './shared/modules/dashboard/dashboard.component';
import { TherapistCalendarComponent } from './shared/modules/therapist-calendar/therapist-calendar.component';
import { PacientsComponent } from './shared/modules/pacients/pacients.component';
import { ReportsComponent } from './shared/modules/reports/reports.component';
import { LoginGuard } from './shared/modules/home/login.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'calendar',component:TherapistCalendarComponent, canActivate: [LoginGuard]},
  {path:'dashboard', component:DashboardComponent, canActivate: [LoginGuard]},
  {path:'report', component:PacientsComponent, canActivate: [LoginGuard]},
  {path:'reports', component:ReportsComponent, canActivate: [LoginGuard]},
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
