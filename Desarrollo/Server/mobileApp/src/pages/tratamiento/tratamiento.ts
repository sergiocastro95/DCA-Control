import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import {TratamientoService} from '../../providers/tratamientoservice';
import {DetailTratamientoPage} from '../detailtratamiento/detailtratamiento';

@Component({
  selector: 'page-tratamiento',
  templateUrl: 'tratamiento.html'
})
export class TratamientoPage {
  public tratamientos = [];
  constructor(public navCtrl: NavController, public tratamientoservice: TratamientoService,public storage:Storage) {
    this.storage.get('userid').then((val) => {
       this.tratamientoservice.getTratamientos(val).then(data => {

          let aux:any = data;
          console.log(aux);
          aux.forEach(element => {
             this.tratamientos.push({id:element.id, nombre:element.nombre, descripcion:element.descripcion});
          });
       
      });
      });
  }
  detalleTratamiento(idd){
    this.navCtrl.push(DetailTratamientoPage,{id: idd});
  }

}
