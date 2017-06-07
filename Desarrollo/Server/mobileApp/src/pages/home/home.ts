import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, App } from 'ionic-angular';
import {HomeService} from '../../providers/homeservice';
import { TabsPage } from '../tabs/tabs';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public mensaje;
  public mensaje2;
  constructor(public navCtrl: NavController, private storage:Storage, public homeservice:HomeService, private app:App) {
    this.storage.get('userid').then((val) => {
       this.homeservice.getnews(val).then(data => {

          let aux:any = data;
          console.log(aux[0].tratamientos_nuevos);
          if(aux[0].tratamientos_nuevos=="0"){
            this.mensaje="Por el momento no hay nuevos tratamientos para ti.";
          }else if(aux[0].tratamientos_nuevos=="1"){
              this.mensaje="Hay un nuevo tratamiento para ti, pulsa para obtener más detalles.";
          }else{
             this.mensaje="Hay "+aux[0].tratamientos_nuevos+ " nuevos tratamientos para ti, pulsa para obtener más detalles.";
          }

          if(aux[0].episodios_nuevos=="0"){
            this.mensaje2="Todos los episodios que te han ocurrido han sido vistos por el médico.";
          }else if(aux[0].episodios_nuevos=="1"){
              this.mensaje2="Hay un episodio que todavía no ha sido visto por el médico.";
          }else{
             this.mensaje2="Hay "+aux[0].episodios_nuevos+ " episodios que todavía no han sido vistos por el médico.";
          }
      });
      });
  }
  goTo(number){
    if(number==1){
      this.app.getRootNav().setRoot(TabsPage,{opentab: 1});
    }else if(number==2){
      this.app.getRootNav().setRoot(TabsPage,{opentab: 2})
    }
  }

}
