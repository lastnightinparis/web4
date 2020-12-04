import {Component, OnInit} from '@angular/core';
import {ConfirmationService, Message, SelectItem} from 'primeng/api';
import {MainService} from "../services/main.service";
import {TableValues} from "./tableValues";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

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

  constructor(private mainService: MainService, private confirmationService: ConfirmationService, private http: HttpClient) {
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
      // {label:'-2', value: -2},
      // {label:'-1.5', value: -1.5},
      // {label:'-1', value: -1},
      // {label:'-0.5', value: -0.5},
      // {label:'0', value: 0},
      {label: '0.5', value: 0.5},
      {label: '1', value: 1},
      {label: '1.5', value: 1.5},
      {label: '2', value: 2}
    ];
  }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('main'));
    this.getExistingValues(localStorage.getItem("user")).subscribe(values => {
      this.rows = values;
      console.log(this.rows.toString());
      this.dots = '';
      for (let point of this.rows) {
        this.dots += point.x_value + ";" + point.y_value + ";" + point.r_value + ";";
      }
      console.log(this.dots);
      localStorage.setItem('dots', this.dots);
      if (this.dots !== '') {
        let points = this.dots.split(';');
        console.log(points.toString());
        for (let i = 0; i < points.length - 2; i += 3) {
          this.createDot(this.getXSVG(Number(points[i]), Number(points[i + 2])), this.getYSVG(Number(points[i + 1]), Number(points[i + 2])), Number(points[i + 2]));
        }
      }
    });
    this.mainService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
    console.log(this.mainService.getCurrentUser().subscribe(user1 => console.log(user1)));
    if (this.currentUser !== undefined) {
      localStorage.setItem('user', this.currentUser);
    } else {
      this.currentUser = localStorage.getItem('user');
    }
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
      this.createDot(this.valueX * 100 / this.valueR + 150, 150 - this.valueY * 100 / this.valueR, this.valueR);
      this.saveDots(this.valueX * 100 / this.valueR + 150, 150 - this.valueY * 100 / this.valueR, this.valueR);
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
      if (this.checkODZ(cx, cy, this.valueR)) {
        console.log(typeof this.valueR);
        this.createDot(cx, cy, this.valueR);
        this.saveDots(cx, cy, this.valueR);
        this.commitPoint(localStorage.getItem("user"), this.valueR, x, y);
      } else {
        this.showModalDialog('Значения для X или Y выходят за допустимый диапозон');
      }
    } else {
      this.showModalDialog('Выберите значение для R');
    }
  }


  checkODZ(cx, cy, r): boolean {
    let x = ((cx - 150) * r / 100);
    let y = (150 - cy) * r / 100;
    return (x >= -2 && x <= 2 && y >= -3 && y <= 5);
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
    document.getElementById('svg').appendChild(circle);
  }

  checkArea(cx, cy, r): boolean {
    //проверка попадания точки в область при клике на свг
    let x = this.getXCoord(cx, r);
    let y = this.getYCoord(cy, r);
    return (x <= 0 && y >= 0 && x >= -r && y <= r / 2) || (x >= 0 && y <= 0 && x * x + y * y <= (r * r) / 4) || (x <= 0 && y <= 0 && y >= -x - r / 2);
  }

  saveDots(cx, cy, r) {
    this.dots += cx.toString() + ';' + cy.toString() + ';' + r.toString() + ';';
    localStorage.setItem('dots', this.dots);
  }

  updateDots() {
    if (this.dots != '' && this.valueR !== null) {
      this.dots = '';
      document.querySelectorAll("circle").forEach((e) => e.remove());
      let points = localStorage.getItem('dots').split(';');
      for (let i = 0; i < points.length - 2; i += 3) {
        let new_cx = (Number(points[i]) - 150) * Number(points[i + 2]) / this.valueR + 150;
        let new_cy = 150 - (150 - Number(points[i + 1])) * Number(points[i + 2]) / this.valueR;
        this.createDot(new_cx, new_cy, this.valueR);
        this.saveDots(new_cx, new_cy, this.valueR);
      }
    }
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Do you want to reset table and coordinate plane ?',
      header: 'Reset Confirmation',
      icon: 'pi pi-info-circle',
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

  resetSVG() {
    this.dots = '';
    localStorage.setItem('dots', this.dots);
    document.querySelectorAll("circle").forEach((e) => e.remove());
  }

  showModalDialog(text) {
    this.errorMessage = text;
    this.displayModal = true;
  }

  commitPoint(username: string, r: number, x: number, y: number) {

    // this.http.get(this.url_test, {});
    this.http.post<any>(this.url, {
      "username": username,
      "x": x,
      "y": y,
      "r": r,
    }).subscribe(point => {
      this.currentPoint = new TableValues(point["x_value"], point["y_value"], point["r_value"], point["current_time"], point["script_time"], point["hit_result"]);
      console.log(this.currentPoint.hit_result);
      this.rows.push(this.currentPoint);
    });

    console.log("commit point");
    // this.mainService.getTableValue(this.url).subscribe(points => console.log(points));
  }

  getData(res: Response) {
    return res.json();
  }

  deletePoints(username: string) {
    this.http.delete(this.url, {
      params: new HttpParams().set('username', username)
    }).subscribe();
    this.rows = [];
  }

  getXCoord(cx, r): number {
    return (cx - 150) * r / 100;
  }

  getYCoord(cy, r): number {
    return (150 - cy) * r / 100;
  }

  getExistingValues(username: string): Observable<TableValues[]> {
    let params = new HttpParams().set("username", username);
    return this.http.get<any>(this.url, {params: params}).pipe(map(points => points.map(point => new TableValues(point["x_value"], point["y_value"], point["r_value"], point["current_time"], point["script_time"], point["hit_result"]))));
  }
  getXSVG(x, r): number {
    return x * 100 / r + 150;
  }
  getYSVG(y, r): number {
    return 150 - y * 100 /r;
  }

}

