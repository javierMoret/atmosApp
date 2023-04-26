import { Component, OnInit } from '@angular/core';
import { TiempoService } from './services/tiempo.service';
import { Ciudad } from './interfaces/ciudad.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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

  constructor(private tiempoService: TiempoService) { }

  ngOnInit(): void {
    
  }

}





