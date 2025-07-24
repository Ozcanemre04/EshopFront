import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { ILoginResponse } from 'src/app/interface/Auth/Login/ILoginResponse';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const refreshtoken = localStorage.getItem("REFRESH_TOKEN");
    let clone = request;
    if (token) {
      clone = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) })
    }

    return next.handle(clone).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && token && refreshtoken) {
          // If a 401 error is returned, try refreshing the token
          return this.authService.refreshToken().pipe(
            switchMap((response: ILoginResponse) => {
              localStorage.setItem('ACCESS_TOKEN', response.accessToken);
              localStorage.setItem('REFRESH_TOKEN', response.refreshToken);

              // Clone the request with the new token
              const newRequest = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + response.accessToken)
              });

              return next.handle(newRequest);
            }),
            catchError(err => {
              // this.authService.logout();
              console.error('Token refresh failed:', err);
              return throwError(() => new Error(err));
            })
          );
        }
        let errorMessage:string = 'an error occured';
        
        if (error.error instanceof ErrorEvent) {
        }

         else {
          console.log(error.message);
          if(typeof error.error==="object"&&error.status!=401){
            errorMessage=error.error.map((x:{errorMessage:string})=>x.errorMessage)?.[0]
          }
          else if(error.status===401){
            errorMessage="UNAUTHORIZED"
          }
          else{
            errorMessage = error.error;
          }
          console.log(errorMessage);
          
          
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
