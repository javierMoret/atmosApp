import { Component, OnInit } from '@angular/core';
import { TiempoService } from '../../services/tiempo.service';
import { Ciudad } from '../../interfaces/ciudad.interface';
import { UserService } from 'src/app/services/user.service';
import { initializeApp } from "firebase/app";
import { get, getDatabase, push, ref, set } from "firebase/database";
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'atmosApp';

  user: any;
  data: any;
  iconCode = "";
  iconUrl = "";
  latUser: number | undefined;
  lonUser: number | undefined;
  resultados: any = [];
  ciudades: any;
  ciudadSeleccionada: any;
  query: string = "";
  ciudadesConjunto: number[] = []
  listaConjuntos: any[] = []
  fondo: string = 'soleado'
  cargado: boolean = false
  nombreConjunto: string = ""
  indiceConjuntoBorrar: any
  indiceConjuntoCargar: any
  filtros: any
  mostrarTiempo: boolean = true;
  mostrarMaxima: boolean = true;
  mostrarMinima: boolean = true;
  mostrarHumedad: boolean = true;
  mostrarSensacion: boolean = false;
  mostrarViento: boolean = false;
  mostrarPresion: boolean = false;

  firebaseConfig = {
    apiKey: "AIzaSyD8rRQBvcR97vfG2QagXHZunKp3pTWdRYU",
    authDomain: "atmosapp-b42d9.firebaseapp.com",
    projectId: "atmosapp-b42d9",
    storageBucket: "atmosapp-b42d9.appspot.com",
    messagingSenderId: "170212286005",
    appId: "1:170212286005:web:32a2ee3e41625c5018db7c",
    measurementId: "G-M3GGYXNDT9",
    databaseURL: "https://atmosapp-b42d9-default-rtdb.europe-west1.firebasedatabase.app/"
  };
  app = initializeApp(this.firebaseConfig);
  database = getDatabase(this.app)



  constructor(private router: Router, public userService: UserService, private tiempoService: TiempoService) { }

  ngOnInit() {
    this.user = window.localStorage.getItem('user')
    this.user = JSON.parse(this.user)
    this.userService.user = this.user
    const userRef = ref(this.database, this.user.uid)
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        if (snapshot.val().conjuntos) {
          this.listaConjuntos = snapshot.val().conjuntos
        } else {
          this.listaConjuntos = []
        }
        if (snapshot.val().filtros) {
          this.filtros = snapshot.val().filtros
          console.log(this.filtros);
        } else {
          this.filtros = {
            'tiempo': this.mostrarTiempo,
            'maxima': this.mostrarMaxima,
            'minima': this.mostrarMinima,
            'sensacion': this.mostrarSensacion,
            'humedad': this.mostrarHumedad,
            'viento': this.mostrarViento,
            'presion': this.mostrarPresion
          }
          const userRef = ref(this.database, this.user.uid)
          const userData = {
            conjuntos: this.listaConjuntos,
            filtros: this.filtros
          }
          set(userRef, userData)
          


        }
      }
    })
    

    console.log(this.database);



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
          case 'muy nuboso':
            this.fondo = 'nublado'
            break;
          case 'lluvia':
          case 'lluvia ligera':
          case 'lluvia moderada':
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
        this.cargado = true;
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
    this.tiempoService.getPronosticoPorNombre('Madrid', 'ES').subscribe(data => {
      console.log(data);

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

  guardarFiltros(){
    const userRef = ref(this.database, this.user.uid)
    const userData = {
      conjuntos: this.listaConjuntos,
      filtros: this.filtros
    }
    set(userRef, userData)
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
          case 'muy nuboso':
            this.fondo = 'nublado'
            break;
          case 'lluvia':
          case 'lluvia ligera':
          case 'lluvia moderada':
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
    this.ciudadesConjunto.push(this.ciudadSeleccionada.id)
    console.log(this.ciudadesConjunto);

  }
  eliminarConjunto() {
    this.listaConjuntos.splice(this.indiceConjuntoBorrar, 1)
    // BASE DE DATOS
    const usersRef = ref(this.database, this.user.uid);
    const userData = {
      conjuntos: this.listaConjuntos,
      filtros: this.filtros
    }
    set(usersRef, userData)
  }
  seleccionarConjuntoBorrar(i: number) {
    this.indiceConjuntoBorrar = i
  }
  seleccionarConjuntoCargar(i: number) {
    this.indiceConjuntoCargar = i
  }
  cargarConjunto() {
    this.ciudadesConjunto = []
    let newArr: any[] = []
    this.listaConjuntos[this.indiceConjuntoCargar].ciudades.forEach((el: any) => {
      newArr.push(el)
    })
    this.ciudadesConjunto = newArr
  }
  eliminarCiudad(i: number) {
    this.ciudadesConjunto.splice(i, 1)

  }
  guardarConjunto(nombre: string) {
    let nuevoConjunto = {
      nombre: nombre,
      ciudades: this.ciudadesConjunto
    }
    this.listaConjuntos.push(nuevoConjunto)

    // BASE DE DATOS
    const usersRef = ref(this.database, this.user.uid);
    const userData = {
      conjuntos: this.listaConjuntos,
      filtros: this.filtros
    }
    set(usersRef, userData)



    this.ciudadesConjunto = []
    this.nombreConjunto = ""
    console.log(this.listaConjuntos);
    console.log(nuevoConjunto);

  }

  cerrarSesion() {
    this.router.navigate(['/login'])
  }
}
