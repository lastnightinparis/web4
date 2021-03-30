import {Component, OnInit, ViewChild} from '@angular/core';
import {MainService} from "../services/main.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {StartService} from "../services/start.service";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  user: {
    username: string;
    password: string;
  };
  userform: FormGroup;
  @ViewChild('start_form') startFormDirective;

  constructor(private router: Router, private mainServer: MainService, private fb: FormBuilder, private authService: AuthService, public startService: StartService) {
    this.createForm();
  }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('main') === 'yes');
    if (sessionStorage.getItem('main') === 'yes') {
      this.router.navigate(["/main"]);
      console.log('lol');
    } else {
      localStorage.clear();
    }
  }

  createForm() {
    this.userform = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.userform.valueChanges.subscribe((data) => this.startService.onValueChange(data, this.userform));
    this.startService.onValueChange(null, this.userform);
  }

  onSubmit() {
    if (this.startService.getFormErrors().username === '' && this.startService.getFormErrors().password === '') {
      this.user = this.userform.value;
      this.mainServer.setCurrentUser(this.user.username);
      localStorage.setItem("user", this.mainServer.currentUser);
      console.log(this.user.username);
      console.log(this.user);
      this.authService.login(this.user);
      console.log("успешно отправлено");
    }
  }
}
