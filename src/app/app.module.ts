import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { AproximarPipe } from './pipes/aproximar.pipe';
import { FormsModule } from '@angular/forms';
import { VerCiudadComponent } from './components/ver-ciudad/ver-ciudad.component';
import { ListadoFavoritosComponent } from './components/listado-favoritos/listado-favoritos.component';
import { CiudadPlaceholderComponent } from './components/ciudad-placeholder/ciudad-placeholder.component';
import { LoginComponent } from './pages/login/login.component';
import {MatIconModule} from '@angular/material/icon';
import { MainComponent } from './pages/main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    AproximarPipe,
    VerCiudadComponent,
    ListadoFavoritosComponent,
    CiudadPlaceholderComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
