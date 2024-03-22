import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api: string | undefined;

  constructor(private httpClient: HttpClient) {
    this.api = environment.domain;
  }

  getAllDocument(): Observable<any> {
    return this.httpClient.get(`${this.api}/document`);
  }

  getAllDepartment(): Observable<any> {
    return this.httpClient.get(`${this.api}/ubdepartment`);
  }

  getAllProvince(id: string): Observable<any> {
    return this.httpClient.get(`${this.api}/ubprovince/` + id);
  }

  getAllDistrict(id: string): Observable<any> {
    return this.httpClient.get(`${this.api}/ubdistrict/` + id);
  }

  getAllService(): Observable<any> {
    return this.httpClient.get(`${this.api}/service`);
  }

  getAllAgency(): Observable<any> {
    return this.httpClient.get(`${this.api}/agency`);
  }

  getAllRequest(): Observable<any> {
    return this.httpClient.get(`${this.api}/request`);
  }

  getAllRequestHistory(): Observable<any> {
    return this.httpClient.get(`${this.api}/request_history`);
  }

  postRequestHistory(form: any): Observable<any> {
    return this.httpClient.post(`${this.api}/request_history/add`, form);
  }

  postSendEmailPerumoney(form: any): Observable<any> {
    return this.httpClient.post(`${this.api}/emailPerumoney`, form);
  }

  postSendEmailQullqui(form: any): Observable<any> {
    return this.httpClient.post(`${this.api}/emailQullqui`, form);
  }
}
