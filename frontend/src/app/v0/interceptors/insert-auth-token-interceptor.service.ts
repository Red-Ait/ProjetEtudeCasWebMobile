import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InsertAuthTokenInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    let newHeaders = req.headers;
    if (token) {
      newHeaders = newHeaders.append('authtoken', token);
    }
    const authReq = req.clone({headers: newHeaders});
    return next.handle(authReq);
  }
}
