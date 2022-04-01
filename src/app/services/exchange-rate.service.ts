import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency } from '../interfaces/currency';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  constructor(private http: HttpClient) { }

  getNBUExchangeRate(): Observable<Currency[]> {
    return this.http.get<Currency[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json');
  }

  getExchangeRateOnFieldChange(from: string, to: string) {
    return this.http.get(`https://api.fastforex.io/fetch-one?from=${from}&to=${to}&api_key=a214df899c-27118e3397-r9m578`);
  }
}
