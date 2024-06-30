import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/modules/home/home.component';

import { DashboardComponent } from './shared/modules/dashboard/dashboard.component';
import { TherapistCalendarComponent } from './shared/modules/therapist-calendar/therapist-calendar.component';
import { PacientsComponent } from './shared/modules/pacients/pacients.component';
import { ReportsComponent } from './shared/modules/reports/reports.component';
import { AllChartsComponent } from './shared/modules/all-charts/all-charts.component';
import { LoginGuard } from './shared/modules/home/login.guard';
import { PaymentComponent } from './shared/modules/payment/payment.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'calendar',component:TherapistCalendarComponent, canActivate: [LoginGuard]},
  {path:'dashboard', component:DashboardComponent, canActivate: [LoginGuard]},
  {path:'report', component:PacientsComponent, canActivate: [LoginGuard]},
  {path:'reports', component:ReportsComponent, canActivate: [LoginGuard]},
  {path:'allcharts',component:AllChartsComponent, canActivate: [LoginGuard]},
  {path:'payment',component:PaymentComponent, canActivate: [LoginGuard]},
  // { path: 'payment-success', component: DashboardComponent },
  // { path: 'payment-failure', component: DashboardComponent },
  // { path: 'payment-pending', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard]},
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
