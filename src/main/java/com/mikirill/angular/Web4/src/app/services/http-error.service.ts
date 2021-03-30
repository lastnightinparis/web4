import { Injectable } from '@angular/core';
import {HttpResponse} from "@angular/common/http";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  constructor() { }
  errorHandler(error: HttpResponse<any>) {
    let errorMsg = `${error.status} - ${error.statusText || ''}. ${error.body}`;
    return throwError(errorMsg);
  }
}
