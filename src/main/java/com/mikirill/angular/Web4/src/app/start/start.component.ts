import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MainService} from "../services/main.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  user: {
    username: string;
    password: string;
  }
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
  userform: FormGroup
  // username = '';
  // password = '';
  @ViewChild('start_form') startFormDirective;
  constructor(private mainServer: MainService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }
  createForm(){
    this.userform = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
    });
    this.userform.valueChanges.subscribe((data) => this.onValueChange(data));
    this.onValueChange();
  }
  onValueChange(data?: any) {
    if (!this.userform) { return; }
    const form = this.userform;
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
  onSubmit(){
    if (this.formErrors.username===''&&this.formErrors.password===''){
      this.user = this.userform.value;
      this.mainServer.setCurrentUser(this.user.username);//хуйня, надо индетифицировать клиента и взять из бд
      //  сделать отправку
    }
  }
}
