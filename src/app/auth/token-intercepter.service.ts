import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable ,Injector} from '@angular/core';
import { AuthService } from '../auth.service';
import {tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService implements HttpInterceptor{

  constructor(private injector:Injector,private routes:Router) { }

  intercept(req:HttpRequest<any>,next:HttpHandler){
    let authService= this.injector.get(AuthService)
   const headers = req.headers.set('Authorization', `BEARER ${authService.getToken()}`)
    let tokenreg=req.clone({
      headers:headers
    })
    return next.handle(tokenreg).pipe(tap((event: HttpEvent<any>) => {
      console.log('event', event );
      if (event instanceof HttpResponse) {
        // const newEvent = {...event};
        return event;
      }
      return event;
      },
     (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.routes.navigate(['/signin']);
        }
      }

  })
    )
}
}
