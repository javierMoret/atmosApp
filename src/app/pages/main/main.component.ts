import { Component, OnInit } from '@angular/core';
import { TiempoService } from '../../services/tiempo.service';
import { Ciudad } from '../../interfaces/ciudad.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'atmosApp';

  data: any;
  iconCode = "";
  iconUrl = "";
  latUser: number | undefined;
  lonUser: number | undefined;
  resultados: any = [];
  ciudades: any;
  ciudadSeleccionada: any;
  query: string = "";
  ciudadesConjunto: Ciudad[] = []
  fondo: string = 'soleado'

  constructor(public userService: UserService, private tiempoService: TiempoService) { }

  ngOnInit() {
    // this.data = this.tiempoService.obtener()
    // this.data = this.tiempoService.getTiempoPorLatLon(33.44,94.04)
    // this.data = this.tiempoService.getTiempoPorId(6359472)

    navigator.geolocation.getCurrentPosition((position) => {
      this.latUser = position.coords.latitude;
      this.lonUser = position.coords.longitude;
      this.tiempoService.getTiempoPorLatLon(this.latUser, this.lonUser).subscribe(data => {
        this.data = data;
        this.iconCode = data.weather[0].icon;
        this.iconUrl = "http://openweathermap.org/img/w/" + this.iconCode + ".png";
        this.ciudadSeleccionada = data;
        switch (data.weather[0].description) {
          case 'cielo claro':
            this.fondo = 'soleado'
            break;
          case 'algo de nubes':
          case 'nubes dispersas':
            this.fondo = 'algonublado'
            break;
          case 'nubes':
            this.fondo = 'nublado'
            break;
          case 'lluvia':
            this.fondo = 'lluvia'
            break;
          case 'nieve':
            this.fondo = 'nieve'
            break;
          case 'tormenta':
            this.fondo = 'tormenta'
            break;
          case 'niebla':
          case 'bruma':
            this.fondo = 'niebla'
            break;
          default:
            this.fondo = 'soleado'
        }
        this.query = `${this.ciudadSeleccionada.name} (${this.ciudadSeleccionada.sys.country})`;
        document.getElementById('wicon')?.setAttribute('src', this.iconUrl)
        console.log('El usuario ha aceptado la ubicación y vive en: ', this.data.name);
        console.log(data);

      })
    }, (error) => {
      console.log('El usuario ha rechazado la ubicación');

    });
    this.tiempoService.getCiudades().subscribe(ciudades => {
      this.ciudades = ciudades
      console.log(this.ciudades);

    })


  }

  cambiarCiudad() {
    this.tiempoService.getTiempoPorId(524894).subscribe(data => {
      this.data = data;
      this.iconCode = data.weather[0].icon;
      this.iconUrl = "http://openweathermap.org/img/w/" + this.iconCode + ".png";
      switch (data.weather[0].description) {

      }
      document.getElementById('wicon')?.setAttribute('src', this.iconUrl)
      console.log('El usuario ha aceptado la ubicación y vive en: ', this.data.name);
      console.log(data);

    })
  }

  buscar(busqueda: string) {
    if (busqueda.length > 2) {
      this.resultados = []
      this.ciudades.forEach((ciudad: any) => {
        if (busqueda == "" || busqueda == undefined) {
          this.resultados.push(ciudad)
        } else {
          if (ciudad.name.toLowerCase().startsWith(busqueda.toLowerCase())) {
            this.resultados.push(ciudad)
          }
        }
      })
      console.log(this.resultados);
    }


  }

  limpiar() {
    this.resultados = []
  }
  seleccionarCiudad(ciudad: string, pais: string) {

    this.tiempoService.getTiempoPorNombre(ciudad, pais).subscribe(res => {
      if (res != undefined && res != "") {
        console.log(res);
        switch (res.weather[0].description) {
          case 'cielo claro':
            this.fondo = 'soleado'
            break;
          case 'algo de nubes':
          case 'nubes dispersas':
            this.fondo = 'algonublado'
            break;
          case 'nubes':
            this.fondo = 'nublado'
            break;
          case 'lluvia':
            this.fondo = 'lluvia'
            break;
          case 'nieve':
            this.fondo = 'nieve'
            break;
          case 'tormenta':
            this.fondo = 'tormenta'
            break;
          case 'niebla':
          case 'bruma':
            this.fondo = 'niebla'
            break;
          default:
            this.fondo = 'soleado'
        }

        this.ciudadSeleccionada = res;
        this.iconCode = res.weather[0].icon;
        this.iconUrl = "http://openweathermap.org/img/w/" + this.iconCode + ".png";
        document.getElementById('wicon')?.setAttribute('src', this.iconUrl)
      }
    })
    this.resultados = []

  }

  addCiudad() {
    this.ciudadesConjunto.push(this.ciudadSeleccionada)
    console.log(this.ciudadesConjunto);

  }
}
