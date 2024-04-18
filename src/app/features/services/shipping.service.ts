import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DeliveryRetrieval } from 'src/app/features/models/delivery-retrieval.model';
import { ShipmentRequest } from '../models/shipment-request.model';
import { VoidShipmentRequest } from '../models/void-shipment-request.model';
import { ShipMethodChangeRequest } from '../models/ship-method-change-request.model';
import { UpdateErpRequest } from '../models/update-erp-request.model';
import { PackingSlipRequest } from '../models/packing-slip-request.model';

@Injectable({
  providedIn: 'root',
})
export class ShippingService {
  constructor(private http: HttpClient) {}

  getPackageLookupValues(
    clientId: number,
    orgId: string,
    invOrgId: string
  ): Observable<any> {
    let parameters = { clientId: clientId, orgId: orgId, invOrgId: invOrgId };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getPackageLookUps`;
    return this.http.get(url, {
      params: queryParams,
    });
  }

  getInventoryLookups(
    clientId: number,
    orgId: string,
    invOrgId: string
  ): Observable<any> {
    let parameters = { clientId: clientId, orgId: orgId, invOrgId: invOrgId };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getInventoryLookups`;
    return this.http.get<any>(url, {
      params: queryParams,
    });
  }

  getDeliveryDetails(payload: DeliveryRetrieval): Observable<any> {
    let url = `${environment.apiUrl}/getDeliveryDetails`;
    return this.http.post(url, payload);
  }

  getCarrierLookups(
    clientId: number,
    orgId: string,
    invOrgId: string,
    carrierId: number,
    carrierCode: number,
    carrierMode: string
  ): Observable<any> {
    let parameters = {
      clientId: clientId,
      orgId: orgId,
      invOrgId: invOrgId,
      carrierId: carrierId,
      carrierCode: carrierCode,
      carrierMode: carrierMode,
    };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getCarrierLookups`;
    return this.http.get<any>(url, {
      params: queryParams,
    });
  }

  ship(payload: ShipmentRequest): Observable<any> {
    let url = `${environment.apiUrl}/ship`;
    return this.http.post(url, payload);
  }

  printPackingSlip(payload: PackingSlipRequest) {
    let url = `${environment.apiUrl}/printPackingSlip`;
    return this.http.post(url, payload);
  }
  getCarrierShippingInfo(
    clientId: number,
    orgId: string,
    invOrgId: string,
    carrierId: number,
    carrierCode: number,
    carrierMode: string,
    accountNumber: string,
    shipmethod: string
  ): Observable<any> {
    let parameters = {
      clientId: clientId,
      orgId: orgId,
      invOrgId: invOrgId,
      carrierId: carrierId,
      carrierCode: carrierCode,
      carrierMode: carrierMode,
      accountNumber: accountNumber,
      shipmethod: shipmethod,
    };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getCarrierInfo`;
    return this.http.get<any>(url, {
      params: queryParams,
    });
  }

  void(payload: VoidShipmentRequest): Observable<any> {
    let url = `${environment.apiUrl}/void`;
    return this.http.post(url, payload);
  }

  shipConfirm(payload: UpdateErpRequest): Observable<any> {
    let url = `${environment.apiUrl}/shipConfirm`;
    return this.http.post(url, payload);
  }
  
  getPackageOptionsLookups(
    clientId: number,
    orgId: string,
    invOrgId: string,
    carrierId: number,
    carrierCode: number,
    carrierMode: string
  ): Observable<any> {
    let parameters = {
      clientId: clientId,
      orgId: orgId,
      invOrgId: invOrgId,
      carrierId: carrierId,
      carrierCode: carrierCode,
      carrierMode: carrierMode,
    };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getPackageOptionsLookups`;
    return this.http.get(url, {
      params: queryParams,
    });
  }
  getHazmatLookUps(
    clientId: number,
    orgId: string,
    invOrgId: string,
    carrierId: number,
    carrierCode: number,
    carrierMode: string
  ): Observable<any> {
    let parameters = {
      clientId: clientId,
      orgId: orgId,
      invOrgId: invOrgId,
      carrierId: carrierId,
      carrierCode: carrierCode,
      carrierMode: carrierMode,
    };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getHazmatLookups`;
    return this.http.get(url, {
      params: queryParams,
    });
  }
  getShipMethodChangeDetails(
    payload: ShipMethodChangeRequest
  ): Observable<any> {
    let url = `${environment.apiUrl}/getShipMethodChangeDetails`;
    return this.http.post(url, payload);
  }

  getIntlLookups(
    clientId: number,
    orgId: string,
    invOrgId: string,
    carrierId: number,
    carrierCode: number,
    carrierMode: string
  ): Observable<any> {
    let parameters = {
      clientId: clientId,
      orgId: orgId,
      invOrgId: invOrgId,
      carrierId: carrierId,
      carrierCode: carrierCode,
      carrierMode: carrierMode,
    };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getIntlLookups`;
    return this.http.get(url, {
      params: queryParams,
    });
  }
}
