import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import { MainComponent } from './main/main.component';
import { StartComponent } from './start/start.component';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SliderModule} from 'primeng/slider';
import {DataViewModule} from 'primeng/dataview';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TableModule} from 'primeng/table';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {MainService} from "./services/main.service";
import {DialogModule} from "primeng/dialog";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    StartComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    AppRoutingModule,
    DropdownModule,
    FormsModule,
    SliderModule,
    DataViewModule,
    BrowserAnimationsModule,
    TableModule,
    MessagesModule,
    ReactiveFormsModule,
    MessageModule,
    ConfirmDialogModule,
    DialogModule,
  ],
  providers: [HttpClientModule, MainService, ConfirmationService, HttpClient ],
  bootstrap: [AppComponent]
})
export class AppModule { }
