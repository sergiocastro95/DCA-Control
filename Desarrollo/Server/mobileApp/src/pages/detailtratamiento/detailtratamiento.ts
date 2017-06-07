import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {TratamientoService} from '../../providers/tratamientoservice';
import { LocalNotifications } from '@ionic-native/local-notifications';
@Component({
  selector: 'page-detailtratamiento',
  templateUrl: 'detailtratamiento.html'
})
export class DetailTratamientoPage {
    public id;
    public nombre;
    public descripcion;
    public notificaciones;
    public horas = [];
    public alert;
  constructor(public navCtrl: NavController, np: NavParams, private tratamientoservice : TratamientoService, private localNotifications: LocalNotifications, public alerCtrl:AlertController, public storage: Storage) {
    this.id = np.get('id');
    this.tratamientoservice.getTratamiento(this.id).then(data => {

          let aux:any = data;
          this.nombre = aux[0].nombre;
          this.descripcion = aux[0].descripcion;
          console.log(aux);
        
       
      });
         console.log("STORAGE");
         let storid = "not"+this.id;
         console.log(storid);
        this.storage.get(storid).then((val) => {
                if(val==null){  //si no hay registros de hora
                    console.log("no hay registros de hora");
                    let h;
                    for(let x = 0; x<24;x++){
                        if(x<10){
                            h = "0"+x;
                        }else{
                            h=x;
                        }

                        this.horas.push({id:x,hora:h+":00", selected: false});
                        

                    }
                }else{  //ya hay un registro
                    console.log("SI hay registros de hora");
                    this.horas = val;
                }
            });
            this.storage.get("chk"+this.id).then((val) => {
                if(val==null){  //si no hay registros de hora
                    this.notificaciones = false;
                }else{  //ya hay un registro
                   this.notificaciones = true;
                }
            });
        
        
        console.log(this.horas);
       
  }
  setNotificaciones(){
      this.deleteNotificaciones();
      let aux;
       let currenthour = new Date();
      this.horas.forEach(element => {
         if(element.selected==true){
             console.log(new Date(currenthour.setHours(element.id,0,0)));
              aux=(element.id*10)+this.id;
            this.localNotifications.schedule({
                id: aux,
                text: 'Recordatorio: toca dosis de '+this.nombre,
                at: new Date(currenthour.setHours(element.id,0,0)),
                every: 'day'
            });
         }
    });
       this.alert = this.alerCtrl.create({
              title: 'Alarmas',
              subTitle: 'Se han guardado los cambios',
              buttons: ['Aceptar']
              
            });
        this.alert.present();
        let storid = "not"+this.id;
        this.storage.set(storid, this.horas);
        this.storage.set("chk"+this.id, 1);
  }
  deleteNotificaciones(){
      let aux;
    this.horas.forEach(element => {
        aux=(element.id*10)+this.id;
         this.localNotifications.cancel(aux);
    });
    
  }
   deleteNotificaciones2(){
       if(this.notificaciones==false){
            let aux;
        this.horas.forEach(element => {
            aux=(element.id*10)+this.id;
            this.localNotifications.cancel(aux);
        });
        this.horas = [];
        let h;
        for(let x = 0; x<24;x++){
            if(x<10){
                h = "0"+x;
            }else{
                h=x;
            }
            this.horas.push({id:x,hora:h+":00", selected: false});                    
        }
        let storid = "not"+this.id;
        this.storage.remove(storid);
        this.storage.remove("chk"+this.id);
        console.log("Se supone que borrado de storage");
       }
      
  }

}
