import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {HistorialService} from '../../providers/historialservice';
@Component({
  selector: 'page-detailhistorial',
  templateUrl: 'detailhistorial.html'
})
export class DetailHistorialPage {
    public id;
    public descripcion = "";
    public fecha;
    public alert;
  
  constructor(public navCtrl: NavController, np: NavParams, private historialservice : HistorialService, public alerCtrl:AlertController) {
    this.id = np.get('id');
    this.historialservice.getEpisodio(this.id).then(data => {

          let aux:any = data;
          this.descripcion = aux[0].descripcion;
          this.fecha = aux[0].fecha;
          console.log(aux);
        this.parsearFecha();
       
      });
      
  }
  parsearFecha(){
    let fechas;
    let hora;
    let splitear;
    let split2;
    let f;

      f = this.fecha;
      splitear = f.split(" ",1);
      fechas = splitear[0].split("-");

      split2 = f.split(" ",2);
      hora = split2[1];
      this.fecha = fechas[2]+"/"+fechas[1]+"/"+fechas[0]+" "+hora;
      
    
  }
  setEpisodio(){
      console.log(this.descripcion);
      this.historialservice.setEpisodio(this.id, this.descripcion).then(data => {

          let aux:any = data;
          //console.log(aux.response);
          if(aux.response=="Ok"){
             this.alert = this.alerCtrl.create({
              title: 'Guardado',
              subTitle: 'Se han guardado los cambios correctamente.',
              buttons: ['Aceptar']
              
            });
            this.alert.present();
          }else{
            this.alert = this.alerCtrl.create({
              title: 'Error al acualizar',
              subTitle: 'Por favor, intentalo de nuevo.',
              buttons: ['Aceptar']
              
            });
            this.alert.present();
          }
    });
  }
 

}
