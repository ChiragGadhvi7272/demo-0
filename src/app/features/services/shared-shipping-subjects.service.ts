import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedShippingSubjectsService {
  private carrierId: any;
  private carrierCode: any;
  private carrierMode: any;
  private shipmentCarrierDetails: any;
  private shipMethodMappingInfo: any;
  private carrierAcctNumbersInfo: any;
  constructor() {}

  private _carrierDetailsObservable$: BehaviorSubject<any[]> =
    new BehaviorSubject([0, 0, '', null, null, null]);
  private _CarrierId$: BehaviorSubject<number> = new BehaviorSubject(0);
  private _CarrierCode$: BehaviorSubject<number> = new BehaviorSubject(0);
  private _CarrierMode$: BehaviorSubject<string> = new BehaviorSubject('');
  private _ShipmentCarrierDetails$: BehaviorSubject<any> = new BehaviorSubject(
    {}
  );
  private _ShipMethodMappingInfo$: BehaviorSubject<any> = new BehaviorSubject(
    {}
  );
  private _carrierAcctNumbersInfo$: BehaviorSubject<any> = new BehaviorSubject(
    {}
  );

  setCarrierId(carrierId: number) {
    console.log('carrierId :: ', carrierId);
    this._CarrierId$.next(carrierId);
  }
  setCarrierCode(carrierCode: number) {
    this._CarrierCode$.next(carrierCode);
  }
  setCarrierMode(carrierMode: string) {
    this._CarrierMode$.next(carrierMode);
  }
  setShipmentCarrierDetails(shipmentCarrierDetails: any) {
    this._ShipmentCarrierDetails$.next(shipmentCarrierDetails);
  }
  setShipMethodMappingInfo(shipMethodMappingInfo: any) {
    this._ShipMethodMappingInfo$.next(shipMethodMappingInfo);
  }
  setCarrierAcctNumbersInfo(carrierAcctNumbersInfo: any) {
    this._carrierAcctNumbersInfo$.next(carrierAcctNumbersInfo);
  }

  ///////// getting carrier objects

  getCarrierId(): Observable<number> {
    return this._CarrierId$.asObservable();
  }
  getCarrierCode(): Observable<number> {
    return this._CarrierCode$.asObservable();
  }
  getCarrierMode(): Observable<string> {
    return this._CarrierMode$.asObservable();
  }
  getShipmentCarrierDetails(): Observable<any> {
    return this._ShipmentCarrierDetails$.asObservable();
  }
  getShipMethodMappingInfo(): Observable<any> {
    return this._ShipMethodMappingInfo$.asObservable();
  }
  getCarrierAcctNumbersInfo(): Observable<any> {
    return this._carrierAcctNumbersInfo$.asObservable();
  }

  // getCarrierDetailsObs(): Observable<any[]> {
  //   console.log('in get carrierdetails');
  //   return this._carrierDetailsObservable$.asObservable();
  // }

  // setCarrierDetailsObs() {
  //   console.log(' Set carrierDetails :: ');
  //   this._carrierDetailsObservable$.next([
  //     this.carrierId,
  //     this.carrierCode,
  //     this.carrierMode,
  //     this.shipmentCarrierDetails,
  //     this.shipMethodMappingInfo,
  //     this.carrierAcctNumbersInfo,
  //   ]);
  // }
}
