import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  public constructor(
    private router: Router
  ) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    const token: string = localStorage.getItem('token');

    let request: HttpRequest<any> = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `${ token }`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('errrroooor: ',err);
        if (err.status === 401) {
          if (token) {
            localStorage.clear();
            localStorage.removeItem('token');
          }
          this.router.navigateByUrl('/');
        }

        if(err.status === 500){
          if(err.error.message === 'jwt expired'){
            if (token) {
              localStorage.clear();
              localStorage.removeItem('token');
            }
            this.router.navigateByUrl('/');
          }
        }
        return throwError( err );

      })
    );
  }

}