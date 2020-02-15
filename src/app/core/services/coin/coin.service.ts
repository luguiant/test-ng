import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ResultListCurrency } from '../../interface/result-list-currency';
import { ResultTopListCurrency } from '../../interface/result-top-list-currency';

@Injectable()
export class CoinService {

  public constructor(
    public http: HttpClient
  ) { }

  public getMyCoins(): Observable<ResultListCurrency>{
    return this.http.get<ResultListCurrency>(`${environment.url_base_service}/coin/list_my_coin`);
  }

  public getMyTop(order: string): Observable<ResultTopListCurrency>{
    return this.http.post<ResultTopListCurrency>(`${environment.url_base_service}/coin/my_favorite_coins`,{order});
  }

  public saveCoin(coin: string): Observable<ResultTopListCurrency>{
    return this.http.post<any>(`${environment.url_base_service}/coin/add_coin`,{coin});
  }

  public converService(from: string, qty: number): Observable<any>{
    return this.http.post<any>(`${environment.url_base_service}/coin/convert`,{from, qty});
  }
}
