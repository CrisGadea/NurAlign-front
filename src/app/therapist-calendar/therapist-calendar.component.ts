import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'app-therapist-calendar',
  templateUrl: './therapist-calendar.component.html',
  styleUrls: ['./therapist-calendar.component.css']
})
export class TherapistCalendarComponent implements OnInit {
  week: string[] = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo"
  ];

  monthSelect: any[] = [];
  dateSelect: any;
  dateValue: any;

  constructor() { }

  ngOnInit(): void {
    const currentDate = moment();
    this.getDaysFromDate(currentDate.month() + 1, currentDate.year());
  }

  getDaysFromDate(month: number, year: number): void {
    const startDate = moment(`${year}-${month}-01`);
    const endDate = startDate.clone().endOf('month');
    this.dateSelect = startDate;

    const numberDays = endDate.date();

    const arrayDays = Array.from({ length: numberDays }, (_, i) => {
      const day = i + 1;
      const dayObject = moment(`${year}-${month}-${day}`);
      return {
        name: dayObject.format("dddd"),
        value: day,
        indexWeek: dayObject.isoWeekday()
      };
    });

    this.monthSelect = arrayDays;
  }

  changeMonth(flag: number): void {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, 'month');
      this.getDaysFromDate(prevDate.month() + 1, prevDate.year());
    } else {
      const nextDate = this.dateSelect.clone().add(1, 'month');
      this.getDaysFromDate(nextDate.month() + 1, nextDate.year());
    }
  }

  clickDay(day: { value: number }): void {
    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day.value}`;
    const objectDate = moment(parse);
    this.dateValue = objectDate;
  }
}