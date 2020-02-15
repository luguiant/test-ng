import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UserService {

 public constructor(
  public http: HttpClient
 ) { }

 public authUser(body): Observable<HttpResponse<string>>{
   return this.http.post<HttpResponse<string>>(`${environment.url_base_service}/user/auth`,body);
 }
}
