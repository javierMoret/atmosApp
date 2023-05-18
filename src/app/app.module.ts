import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { AproximarPipe } from './pipes/aproximar.pipe';
import { FormsModule } from '@angular/forms';
import { VerCiudadComponent } from './components/ver-ciudad/ver-ciudad.component';
import { CiudadPlaceholderComponent } from './components/ciudad-placeholder/ciudad-placeholder.component';
import { LoginComponent } from './pages/login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { MainComponent } from './pages/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    AproximarPipe,
    VerCiudadComponent,
    CiudadPlaceholderComponent,
    LoginComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatSliderModule,
    MatSnackBarModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
