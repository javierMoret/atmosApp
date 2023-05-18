import { Component, OnInit } from '@angular/core';
import { TiempoService } from './services/tiempo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'atmosApp';


  constructor(private tiempoService: TiempoService) { }

  ngOnInit(): void {
    
  }

}





