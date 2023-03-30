import { Component, OnInit } from '@angular/core';
import { TiempoService } from './services/tiempo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'atmosApp';

  data: any;
  latUser: number | undefined;
  lonUser: number | undefined;

  constructor(private tiempoService: TiempoService) { }

  ngOnInit() {
    // this.data = this.tiempoService.obtener()
    // this.data = this.tiempoService.getTiempoPorLatLon(33.44,94.04)
    // this.data = this.tiempoService.getTiempoPorId(6359472)
    navigator.geolocation.getCurrentPosition((position) => {
      this.latUser = position.coords.latitude;
      this.lonUser = position.coords.longitude;
      this.tiempoService.getTiempoPorLatLon(this.latUser, this.lonUser).subscribe(data => {
        this.data = data;
        console.log('El usuario ha aceptado la ubicación y vive en: ', this.data.name);
      })
    }, (error)=>{
      console.log('El usuario ha rechazado la ubicación');
      
    });





  }

}





