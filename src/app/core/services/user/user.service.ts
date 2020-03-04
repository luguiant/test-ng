import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface responseCoin{
  coin: string
}
@Injectable()
export class UserService {

 public constructor(
  public http: HttpClient
 ) { }

 public authUser(body): Observable<HttpResponse<string> | HttpErrorResponse>{
   return this.http.post<HttpResponse<string> | HttpErrorResponse>(`${environment.url_base_service}/user/auth`,body);
 }

 public dataUser():Observable<responseCoin>{
   return this.http.get<responseCoin>(`${environment.url_base_service}/user/data_user`);
 }

}
