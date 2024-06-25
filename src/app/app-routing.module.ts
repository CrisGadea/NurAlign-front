import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/modules/home/home.component';

import { DashboardComponent } from './shared/modules/dashboard/dashboard.component';
import { TherapistCalendarComponent } from './shared/modules/therapist-calendar/therapist-calendar.component';
import { PacientsComponent } from './shared/modules/pacients/pacients.component';
import { ReportsComponent } from './shared/modules/reports/reports.component';
import { AllChartsComponent } from './shared/modules/all-charts/all-charts.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'calendar',component:TherapistCalendarComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'report', component:PacientsComponent},
  {path:'reports', component:ReportsComponent},
  {path:'allcharts',component:AllChartsComponent},
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
