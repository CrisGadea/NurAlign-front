import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/modules/home/home.component';

import { DashboardComponent } from './shared/modules/dashboard/dashboard.component';
import { TherapistCalendarComponent } from './shared/modules/therapist-calendar/therapist-calendar.component';
import { PacientsComponent } from './shared/modules/pacients/pacients.component';
import { ReportsComponent } from './shared/modules/reports/reports.component';
import { SleepChartComponent } from './shared/modules/sleep-chart/sleep-chart.component';
import { MoodChartComponent } from './shared/modules/mood-chart/mood-chart.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'calendar',component:TherapistCalendarComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'report', component:PacientsComponent},
  {path:'reports', component:ReportsComponent},
  {path:'sleep', component:SleepChartComponent},
  {path:'mood', component:MoodChartComponent},
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
