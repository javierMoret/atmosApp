import { Component, Input, OnInit } from '@angular/core';
import { Ciudad } from 'src/app/interfaces/ciudad.interface';
import { TiempoService } from '../../services/tiempo.service';
import { format } from 'date-fns';
import { es } from 'date-fns/esm/locale'



@Component({
  selector: 'app-ver-ciudad',
  templateUrl: './ver-ciudad.component.html',
  styleUrls: ['./ver-ciudad.component.css']
})
export class VerCiudadComponent implements OnInit {

  ciudad!: Ciudad
  @Input() idCiudad!: number
  cargado: boolean = false;
  selectedValue: number = 0;
  pronosticos: Ciudad[] = [];
  ciudadSeleccionada: any


  constructor(private tiempoService: TiempoService) { }

  cambiarCiudad(event: any){
    this.ciudadSeleccionada = this.pronosticos[event.target.value]
    
  }

  ngOnInit(): void {
    this.tiempoService.getTiempoPorId(this.idCiudad).subscribe(data => {
      console.log(data);
      this.pronosticos.push(data)
      this.ciudadSeleccionada=data
      this.ciudad = {
        nombre: data.name,
        country: data.sys.country,
        id: data.id,
        temp: data.main.temp,
        temp_max: data.main.temp_max,
        temp_min: data.main.temp_min,
        humedad: data.main.humidity,
        presion: data.main.pressure,
        viento: data.wind.speed,
        tiempo: data.weather[0].description
      };
      this.cargado = true;
      console.log(data);

    })
    this.tiempoService.getPronosticoPorId(this.idCiudad).subscribe(data => {
      console.log(data);
      this.pronosticos.push(data.list[8])
      this.pronosticos.push(data.list[16])
      this.pronosticos.push(data.list[24])
      console.log(this.pronosticos);
      
      
      
    })
  }
  primeraMayuscula(cadena: string): string {
    let newCadena = ""
    for (let i = 0; i <= cadena.length; i++) {
      let letra = cadena.charAt(i)
      if (i == 0) {
        newCadena += letra.toUpperCase()
      } else {
        newCadena += letra
      }
    }
    return newCadena
  }

  formatLabel(value: number): string {
    const hoy = new Date()
    const day1 = new Date()
    day1.setDate(day1.getDate() + 1)
    const day2 = new Date()
    day2.setDate(day2.getDate() + 2)
    const day3 = new Date()
    day3.setDate(day3.getDate() + 3)
    const day4 = new Date()
    day4.setDate(day4.getDate() + 4)

    switch (value) {
      case 0:
        return 'Ahora'
      case 1:
        return format(day1, 'EEEE', { locale: es })
      case 2:
        return format(day2, 'EEEE', { locale: es })
      case 3:
        return format(day3, 'EEEE', { locale: es })
      case 4:
        return format(day4, 'EEEE', { locale: es })
      default:
        return ''
    }
  }



}
