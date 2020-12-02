import {Routes} from '@angular/router';
import {StartComponent} from "../start/start.component";
import {MainComponent} from "../main/main.component";

export const routes: Routes = [
  {path: 'start', component: StartComponent},
  {path: '', redirectTo: '/start', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
];
