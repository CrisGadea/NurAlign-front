import { Component } from '@angular/core';
import { HeaderVComponent } from '../../components/header-v/header-v.component';
import { FooterVComponent } from '../../components/footer-v/footer-v.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone:true,
  imports: [
    HeaderVComponent,
    FooterVComponent
  ]
})
export class DashboardComponent {

}
