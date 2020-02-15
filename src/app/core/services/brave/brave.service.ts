import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class BraveService {

  public constructor(public http: HttpClient) { }

  public getAllDigitalCurrency(): Observable<any>{
    return this.http.get<any>(`${environment.url_base_service}/brave/list_digital_currency`);
  }
}
