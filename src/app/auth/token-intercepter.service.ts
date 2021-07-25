import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable ,Injector} from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService implements HttpInterceptor{

  constructor(private injector:Injector) { }

  intercept(req:HttpRequest<any>,next:HttpHandler){
    let authService= this.injector.get(AuthService)
   const headers = req.headers.set('Authorization', `BEARER ${authService.getToken()}`)
    let tokenreg=req.clone({
      headers:headers
    })
    return next.handle(tokenreg)
  }
}
