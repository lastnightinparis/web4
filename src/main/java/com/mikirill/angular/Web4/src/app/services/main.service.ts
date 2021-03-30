import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TableValues} from "../main/tableValues";
import {ConfirmationService} from "primeng/api";
import {catchError, map} from "rxjs/operators";
import {HttpErrorService} from "./http-error.service";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(public httpClient: HttpClient, private httpErrorService: HttpErrorService) { }
  currentUser: string;
  getCurrentUser():Observable<string> {
    return of(this.currentUser);
  }
  getXCoord(cx, r): number {
    return (cx - 150) * r / 100;
  }

  getYCoord(cy, r): number {
    return (150 - cy) * r / 100;
  }
  getXSVG(x, r): number {
    return x * 100 / r + 150;
  }

  getYSVG(y, r): number {
    return 150 - y * 100 / r;
  }
  getExistingValues(username: string, url: string): Observable<TableValues[]> {
    let params = new HttpParams().set("username", username);
    return this.httpClient.get<TableValues[]>(url, {params: params}).pipe(catchError(this.httpErrorService.errorHandler));
  }
  setCurrentUser(cu: string) {
    this.currentUser = cu;
  }
  checkODZ(cx, cy, r): boolean {
    let x = this.getXCoord(cx, r);
    let y = this.getYCoord(cy, r);
    return (x >= -2 && x <= 2 && y >= -3 && y <= 5);
  }
  checkArea(cx, cy, r): boolean {
    //проверка попадания точки в область при клике на свг
    let x = this.getXCoord(cx, r);
    let y = this.getYCoord(cy, r);
    return (x <= 0 && y >= 0 && x >= -r && y <= r / 2) || (x >= 0 && y <= 0 && x * x + y * y <= (r * r) / 4) || (x <= 0 && y <= 0 && y >= -x - r / 2);
  }
  createDot(cx, cy, r) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circle.setAttribute('cx', cx.toString());
    circle.setAttribute('cy', cy.toString());
    circle.setAttribute('r', "3");
    circle.setAttribute('fill-opacity', "0.3")
    circle.setAttribute('class', 'points');
    if (this.checkArea(cx, cy, r)) {
      circle.setAttribute("fill", "#2E8B57");
      circle.setAttribute('stroke', "#2E8B57");
    } else {
      circle.setAttribute("fill", "#800000");
      circle.setAttribute('stroke', "#800000");
    }
    console.log(cx + ' ' + cy + ' ' + r + ' ');
    return circle;
  }

  saveDots(cx, cy, r, dots): string {
    dots += this.getXCoord(cx, r).toString() + ';' + this.getYCoord(cy, r).toString() + ';' + r.toString() + ';';
    localStorage.setItem('dots', dots);
    return dots;
  }

  sendPoint(username: string, r: number, x: number, y: number, url: string):Observable<TableValues> {
    return this.httpClient.post<TableValues>(url, {
      "username": username,
      "x": x,
      "y": y,
      "r": r,
    }).pipe(catchError(this.httpErrorService.errorHandler));
  }
  deletePoints(username: string, url: string):Observable<any> {
    return this.httpClient.delete(url, {
      params: new HttpParams().set('username', username)
    }).pipe(catchError(this.httpErrorService.errorHandler));
  }
}
