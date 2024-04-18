import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductDetails } from '../models/product-details.model';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  constructor(private http: HttpClient) {}

  getProductDetails(
    clientId: number,
    orgId: string,
    invOrgId: string
  ): Observable<ProductDetails[]> {
    let parameters = {
      clientId: clientId,
      orgId: orgId,
      invOrgId: invOrgId,
    };

    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/getProductDetails?`;
    return this.http.get<ProductDetails[]>(url, { params: queryParams });
  }

  saveProductDetails(payload: ProductDetails) {
    let url = `${environment.apiUrl}/createOrUpdateProductDetails`;
    return this.http.post<ProductDetails>(url, payload);
  }

  uploadFile(
    clientId: number,
    orgId: string,
    invOrgId: string,
    formData: FormData
  ): Observable<any> {
    let parameters = { clientId: clientId, orgId: orgId, invOrgId: invOrgId };
    let queryParams = new HttpParams({ fromObject: parameters });
    let url = `${environment.apiUrl}/uploadProductDetails?`;
    return this.http.post<any>(url, formData, { params: queryParams });
  }

  getProductsLookupValues(): Observable<any> {
    let url = `${environment.apiUrl}/getProductsLookupValues`;
    return this.http.get(url);
  }
}
