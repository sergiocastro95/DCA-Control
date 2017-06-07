import { Component, OnInit } from '@angular/core';
import {InicioService} from './inicio.service';
import {RouterModule,ActivatedRoute,Router, Params} from '@angular/router';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers:[InicioService]
})
export class InicioComponent implements OnInit {
  novedades = [];
  public iniciado = false;
  constructor( private inicioservice: InicioService, private router:Router) {
     this.inicioservice.getnovedades().subscribe(response=>{
        response.forEach(element =>{
          let men = "";
          if(element.episodios_nuevos==0){
            men = 'No ha sufrido ningún ataque desde la última conexión';
          }else if(element.episodios_nuevos == 1){
            men = 'Ha sufrido 1 nuevo ataque desde la última conexión';
          }else{
            men = 'Ha sufrido '+ element.episodios_nuevos+' nuevos ataques desde la última conexión';
          }
          let men2 = "";
          if(element.tratamientos_nuevos==0){
            men2 = 'No se le ha asignado ningún tratamiento nuevo desde tu última conexión';
          }else if(element.tratamientos_nuevos == 1){
            men2 = 'Se le ha asignado 1 nuevo tratamiento desde tu última conexión';
          }else{
            men2 = 'Se le han asignado '+ element.tratamientos_nuevos+' nuevos tratamientos desde tu última conexión';
          }

          this.novedades.push({'nombre': element.nombre+" "+element.apellidos, 'id': element.sip, 'mensaje': men, 'mensaje2': men2});
          
        });
        console.log(this.novedades);
        this.iniciado = true;
        },error =>{
          alert("Error al recuperar médicos");
        }
    );
   }

  ngOnInit() {
  }

}
