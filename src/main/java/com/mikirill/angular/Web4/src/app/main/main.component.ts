import {Component, OnInit} from '@angular/core';
import {ConfirmationService, Message, SelectItem} from 'primeng/api';
import {MainService} from "../services/main.service";
import {TableValues} from "./tableValues";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  url = "http://localhost:8080/spring-security-jwt-example-0.0.1-SNAPSHOT/points";
  url_test = "http://localhost:8080/spring-security-jwt-example-0.0.1-SNAPSHOT/hello";
  selectedValues = {
    valueX: 0,
    valueY: 0,
    valueR: 0,
  };
  currentPoint: TableValues;
  rows: TableValues[] = [];
  errorMessage = '';
  displayModal = false;
  dots = '';
  valueX: number;
  valueY: number;
  valueR: number;
  valuesX: SelectItem[];
  valuesR: SelectItem[];
  currentUser: string;

  constructor(private mainService: MainService, private confirmationService: ConfirmationService, private http: HttpClient, private router: Router) {
    this.valuesX = [
      {label: '-2', value: -2},
      {label: '-1.5', value: -1.5},
      {label: '-1', value: -1},
      {label: '-0.5', value: -0.5},
      {label: '0', value: 0},
      {label: '0.5', value: 0.5},
      {label: '1', value: 1},
      {label: '1.5', value: 1.5},
      {label: '2', value: 2}
    ];
    this.valuesR = [
      {label: '0.5', value: 0.5},
      {label: '1', value: 1},
      {label: '1.5', value: 1.5},
      {label: '2', value: 2}
    ];
  }

  ngOnInit(): void {
    this.getDBData();
    this.setCurrentUser();
  }

  onSubmit() {
    if (this.valueX === undefined) {
      this.showModalDialog('Значение для X не выбрано');
    } else if (this.valueY === undefined) {
      this.showModalDialog('Значение для Y не выбрано');
    } else if (this.valueR === undefined) {
      this.showModalDialog('Значение для R не выбрано');
    } else {
      this.selectedValues.valueX = this.valueX;
      this.selectedValues.valueY = this.valueY;
      this.selectedValues.valueR = this.valueR;
      this.createDot(this.mainService.getXSVG(this.valueX, this.valueR),
        this.mainService.getYSVG(this.valueY, this.valueR), this.valueR);
      this.dots = this.mainService
        .saveDots(this.mainService.getXSVG(this.valueX, this.valueR),
          this.mainService.getYSVG(this.valueY, this.valueR),
          this.valueR, this.dots);
      this.commitPoint(localStorage.getItem("user"), this.valueR, this.valueX, this.valueY);
    }
  }

  svgClick(event) {
    let dim = document.getElementById('svg').getBoundingClientRect();
    let cx = event.clientX - dim.left;
    let cy = event.clientY - dim.top;
    if (this.valueR !== undefined && this.valueR !== null) {
      let x = ((cx - 150) * this.valueR / 100);
      let y = (150 - cy) * this.valueR / 100;
      if (this.mainService.checkODZ(cx, cy, this.valueR)) {
        console.log(typeof this.valueR);
        this.createDot(cx, cy, this.valueR);
        this.mainService.saveDots(cx, cy, this.valueR, this.dots);
        this.commitPoint(localStorage.getItem("user"), this.valueR, x, y);
      } else {
        this.showModalDialog('Значения для X или Y выходят за допустимый диапозон');
      }
    } else {
      this.showModalDialog('Выберите значение для R');
    }
  }

  createDot(cx, cy, r) {
    const circle = this.mainService.createDot(cx, cy, r);
    document.getElementById('svg').appendChild(circle);
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Do you want to reset table and coordinate plane ?',
      header: 'Reset Confirmation',
      // icon: 'pi pi-info-circle',
      accept: () => {
        this.resetSVG();
        this.deletePoints(localStorage.getItem("user"));
      }
    });

  }

  onExit() {
    sessionStorage.setItem('main', 'no');
    localStorage.clear();
  }

  updateDots() {
    if (this.dots != '' && this.valueR !== null) {
      this.dots = '';
      document.querySelectorAll("circle").forEach((e) => e.remove());
      let points = localStorage.getItem('dots').split(';');
      for (let i = 0; i < points.length - 2; i += 3) {
        let new_cx = this.mainService.getXSVG(points[i], this.valueR);
        let new_cy = this.mainService.getYSVG(points[i + 1], this.valueR);
        this.createDot(new_cx, new_cy, this.valueR);
        this.dots = this.mainService.saveDots(new_cx, new_cy, this.valueR, this.dots);
      }
    }
  }

  resetSVG() {
    this.dots = '';
    localStorage.setItem('dots', '');
    document.querySelectorAll("circle").forEach((e) => e.remove());
  }

  showModalDialog(text) {
    this.errorMessage = text;
    this.displayModal = true;
  }

  getData(res: Response) {
    return res.json();
  }

  deletePoints(username: string) {
    this.mainService.deletePoints(username, this.url).subscribe(
      () => this.rows = [],
      error => this.showModalDialog(error)
  );
  }

  getDBData() {
    this.mainService.getExistingValues(localStorage.getItem("user"), this.url).subscribe(values => {
      this.rows = values;
      this.dots = '';
      for (let point of this.rows) {
        this.dots += point.x_value + ";" + point.y_value + ";" + point.r_value + ";";
      }
      localStorage.setItem('dots', this.dots);
      if (this.dots !== '') {
        let points = this.dots.split(';');
        for (let i = 0; i < points.length - 2; i += 3) {
          this.createDot(this.mainService.getXSVG(Number(points[i]),
            Number(points[i + 2])), this.mainService.getYSVG(Number(points[i + 1]),
            Number(points[i + 2])), Number(points[i + 2]));
        }
      }
    });
  }

  setCurrentUser() {
    this.mainService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    }, error => this.showModalDialog(error));
    if (this.currentUser !== undefined) {
      localStorage.setItem('user', this.currentUser);
    } else {
      this.currentUser = localStorage.getItem('user');
    }
  }

  commitPoint(username: string, r: number, x: number, y: number) {
    if (localStorage.getItem("token") === null || localStorage.getItem("user") === null) {
      this.showModalDialog("Ваша сессия более недействительна");
      localStorage.clear();
      this.router.navigateByUrl("/start");
      return;
    }

    // this.http.get(this.url_test, {});
    this.mainService.sendPoint(username, r, x, y, this.url).subscribe(point => {
      this.currentPoint =  point;
      this.rows.push(this.currentPoint);
    }, error => this.showModalDialog(error));
  }
}

