import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Currency } from 'src/app/interfaces/currency';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() currencies!: Currency[];
  date!: any;

  datePipe: DatePipe = new DatePipe('en-US')
  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.date = this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss');
    }, 1000);
  }

}
