import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class StartService {
  formErrors = {
    'password': '',
    'username': '',
  };
  messageErrors = {
    'password': {
      'required': 'Password is required'
    },
    'username': {
      'required': 'Username is required',
    }
  };
  constructor() { }
  getFormErrors() {
    return this.formErrors;
  }
  onValueChange(data?: any, userform?: FormGroup) {
    if (!userform) {
      return;
    }
    const form = userform;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.messageErrors[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
