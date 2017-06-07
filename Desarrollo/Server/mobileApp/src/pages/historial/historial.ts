import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HistorialService} from '../../providers/historialservice';
import {DetailHistorialPage} from '../detailhistorial/detailhistorial'

@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html'
})
export class HistorialPage {
  episodios = [];
  constructor(public navCtrl: NavController, public storage:Storage, public historialservice:HistorialService) {
    this.storage.get('userid').then((val) => {
       this.historialservice.getHistorial(val).then(data => {

          let aux:any = data;
          console.log(aux);
          aux.forEach(element => {
             this.episodios.push({id:element.id, fecha:element.fecha, descripcion:element.descripcion});
          });
          this.parsearFecha();
      });
      });
  }
  parsearFecha(){
    let fechas;
    let horas;
    let splitear;
    let splitear2;
    let f;
    for(var x = 0; x <Object.keys(this.episodios).length;x++){
      f = this.episodios[x].fecha;
      splitear = f.split(" ",1);
      fechas = splitear[0].split("-");

      splitear2 = f.split(" ",2);
      horas = splitear2[1];

      this.episodios[x].fecha = fechas[2]+"/"+fechas[1]+"/"+fechas[0]+" "+horas;
      
    }
  }
  detalleEpisodio(idd){
    this.navCtrl.push(DetailHistorialPage,{id: idd});
  }

}
