import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtHelperService} from '@auth0/angular-jwt';

// import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  jwt = new JwtHelperService();
  url_auth = "http://localhost:8080/spring-security-jwt-example-0.0.1-SNAPSHOT/authenticate";
  url_sign = "http://localhost:8080/spring-security-jwt-example-0.0.1-SNAPSHOT/sign-in";

  constructor(private http: HttpClient, private router: Router) {
  }

  login(user) {
    console.log(user.username);
    this.http.post(this.url_auth, user).subscribe(
      (res: any) => {
        if (res["token"] !== "bad") {
          localStorage.setItem("token", res["token"]);
          console.log(res["token"] + " is token");
          sessionStorage.setItem('main', 'yes');
          this.router.navigateByUrl("/main");
        } else
          alert("bad login/password");
      }
    );
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("/start");
  }

  getTokenExpirationDate(token: string): Date {
    if (this.jwt.decodeToken(token) === undefined) return null;
    return this.jwt.getTokenExpirationDate(token);
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = localStorage.getItem("token");
    if (!token) return true;

    let date = this.jwt.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  getToken() {
    return localStorage.getItem("token");
  }
}
