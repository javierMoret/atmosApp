import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

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
import { MatExpansionModule} from '@angular/material/expansion';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { PrimeraMayusculaPipe } from './pipes/primera-mayuscula.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AproximarPipe,
    VerCiudadComponent,
    ListadoFavoritosComponent,
    CiudadPlaceholderComponent,
    LoginComponent,
    MainComponent,
    PrimeraMayusculaPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatExpansionModule,
    CdkAccordionModule,
    MatSliderModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
