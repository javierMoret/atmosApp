import { Component, Input, OnInit } from '@angular/core';
import { Ciudad } from 'src/app/interfaces/ciudad.interface';
import { TiempoService } from '../../services/tiempo.service';
import { format } from 'date-fns';




@Component({
  selector: 'app-ver-ciudad',
  templateUrl: './ver-ciudad.component.html',
  styleUrls: ['./ver-ciudad.component.css']
})
export class VerCiudadComponent implements OnInit {

  ciudad!: Ciudad
  @Input() idCiudad!: number
  cargado: boolean = false;
  sliderValues = ['Hoy', 'Mañana', 'Pasado'];
  selectedValue: number = 0;


  constructor(private tiempoService: TiempoService) { }

  ngOnInit(): void {
    this.tiempoService.getTiempoPorId(this.idCiudad).subscribe(data => {
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
  }

  formatLabel(value: number): string {
    const hoy = new Date()
    const day1 = new Date()
    day1.setDate(day1.getDate() + 1)
    const day2 = new Date()
    day2.setDate(day2.getDate() + 2)
    const day3 = new Date()
    day3.setDate(day3.getDate() + 3)

    switch (value) {
      case 0:
        return format(hoy, 'E. dd')
      case 1:
        return format(day1, 'E. dd')
      case 2:
        return format(day2, 'E. dd')
      case 3:
        return format(day3, 'E. dd')
      default:
        return ''
    }
  }

}
