import { Component, Input, OnInit } from '@angular/core';
import { Ciudad } from 'src/app/interfaces/ciudad.interface';
import { TiempoService } from '../../services/tiempo.service';

@Component({
  selector: 'app-ver-ciudad',
  templateUrl: './ver-ciudad.component.html',
  styleUrls: ['./ver-ciudad.component.css']
})
export class VerCiudadComponent implements OnInit{

  ciudad!:Ciudad
  @Input() idCiudad!: number
  cargado: boolean = false;

  constructor(private tiempoService:TiempoService){}

  ngOnInit(): void {
    this.tiempoService.getTiempoPorId(this.idCiudad).subscribe(data => {
      this.ciudad = {
        nombre: data.name,
        country:data.sys.country,
        id:data.id,
        temp:data.main.temp,
        temp_max:data.main.temp_max,
        temp_min:data.main.temp_min,
        humedad:data.main.humidity,
        presion:data.main.pressure,
        viento:data.wind.speed,
        tiempo: data.weather[0].description
      };
      this.cargado = true;
      console.log(data);

    })
  }
}
