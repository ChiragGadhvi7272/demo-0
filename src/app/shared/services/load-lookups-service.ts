import { Injectable } from '@angular/core';
import { LookupValuesService } from './lookup-values.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadLookupsService {
  constructor(private lookUpService: LookupValuesService) {}
  private _countryCodesList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  private _currencyCodesList: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);
  private _customerNamesList: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);

  loadCountryCurrLookUps() {
    this.lookUpService.getCountryCodeValues().subscribe({
      next: (resp: any) => {
        this._countryCodesList.next(resp.data);
      },
      error: (error: any) => {
        console.error('Error loading country codes:', error);
      },
    });

    this.lookUpService.getCurrencyCodeValues().subscribe({
      next: (resp: any) => {
        this._currencyCodesList.next(resp.data);
      },
      error: (error: any) => {
        console.error('Error loading currency codes:', error);
      },
    });
  }

  loadCustomerNames() {
    this.lookUpService.getAllCustomerNames().subscribe({
      next: (resp: any) => {
        this._customerNamesList.next(resp.data);
      },
      error: (error: any) => {
        console.error('Error loading customer names:', error);
      },
    });
  }

  getCountryCodes() {
    return this._countryCodesList;
  }

  getCurrencyCodes() {
    return this._currencyCodesList;
  }

  getCustomerNames() {
    return this._customerNamesList;
  }

  clearCustomerNames() {
    this._customerNamesList.next([]);
  }
}
