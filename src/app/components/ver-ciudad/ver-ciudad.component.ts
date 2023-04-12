import { Component, Input, OnInit } from '@angular/core';
import { Ciudad } from 'src/app/interfaces/ciudad.interface';

@Component({
  selector: 'app-ver-ciudad',
  templateUrl: './ver-ciudad.component.html',
  styleUrls: ['./ver-ciudad.component.css']
})
export class VerCiudadComponent implements OnInit{

  @Input() data!: any;
  ciudad!:Ciudad



  ngOnInit(): void {
    console.log(this.data);
    this.ciudad = {
      nombre: this.data.name,
      country:this.data.sys.country,
      id:this.data.id,
      temp:this.data.main.temp,
      temp_max:this.data.main.temp_max,
      temp_min:this.data.main.temp_min,
      humedad:this.data.main.humidity,
      presion:this.data.main.pressure,
      viento:this.data.wind.speed,
      tiempo: this.data.weather[0].description
    };
  }
}
