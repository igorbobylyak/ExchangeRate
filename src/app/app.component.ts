import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from './services/exchange-rate.service';
import { Currency } from './interfaces/currency';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currencies: Currency[] = [];

  constructor(private exchangeRateService: ExchangeRateService) {}

  ngOnInit(): void {
    this.exchangeRateService.getNBUExchangeRate()
      .subscribe((res: Currency[]) => {
        this.currencies = res.filter(curr => curr.cc === 'USD' || curr.cc === 'EUR')
      });
  }
}
