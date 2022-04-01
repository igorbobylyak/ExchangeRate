import { Component, Input, OnInit } from '@angular/core';
import { Currency } from 'src/app/interfaces/currency';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css']
})
export class ConvertComponent implements OnInit {
  @Input() currencies!: Currency[];

  allCurrencies: string[] = ['USD', 'EUR', 'UAH'];
  
  inputs: any = {
    first: '',
    second: ''
  }
  
  selects: any = {
    first: '',
    second: ''
  };

  constructor(private exchangeRateService: ExchangeRateService) {}

  ngOnInit(): void {
  }

  inputChange(event: any, select1: any, select2: any) {
    const { name, value } = event.target;
    this.inputs[name] = value;

    this.selects.first = select1.value;
    this.selects.second = select2.value;

    if (name === 'first') {
      this.exchangeRateService.getExchangeRateOnFieldChange(select1.value, select2.value)
        .subscribe((res: any) => {
          this.inputs.second = this.getValue(value, res?.result[select2.value]);
        })
    } else {
      this.exchangeRateService.getExchangeRateOnFieldChange(select2.value, select1.value)
        .subscribe((res: any) => {
          this.inputs.first = this.getValue(value, res?.result[select1.value]);
        })
    }
  }

  selectChange(event: any, input1: any, input2: any) {
    const { name, value } = event.target;
    this.selects[name] = value;

    this.exchangeRateService.getExchangeRateOnFieldChange(value, this.selects[input2.name]).subscribe((res: any) => {
      this.inputs.second = this.getValue(this.inputs.first, res?.result[this.selects[input2.name]]);
    })

    if (name === 'second') {
      this.exchangeRateService.getExchangeRateOnFieldChange(this.selects.first, this.selects.second)
        .subscribe((res: any) => {
          this.inputs.second = this.getValue(this.inputs.first, res?.result[this.selects.second]);
        })
    }

  }

  getValue(amount: number, rate: number): string {
    return (amount * rate).toFixed(3);
  }

}
