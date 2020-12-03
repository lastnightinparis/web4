import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("start intercept");
    if (localStorage.getItem("token") !== null) {
      request = request.clone({
        setHeaders: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
    }
    console.log(request.headers.get("Authorization" + " is header"));
    return next.handle(request);
  }
}
