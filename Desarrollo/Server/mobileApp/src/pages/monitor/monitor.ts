import { Component } from '@angular/core';
import { BLE } from '@ionic-native/ble';
import { NavController } from 'ionic-angular';
import {MonitorService} from '../../providers/monitorservice';
import {BuscarpulseraPage} from '../buscarpulsera/buscarpulsera';
declare var cordova;
@Component({
  selector: 'page-monitor',
  templateUrl: 'monitor.html'
})
export class MonitorPage {
  public services;
  public data;
  public idselect ="DF:85:09:6E:05:F8";
  public conectado = false;
  public varinfinita = 0;
  public intervalo;
  public monitori = false;
  constructor(public navCtrl: NavController, public ble: BLE, public monit:MonitorService) {
  console.log("Página monitorizar");
    
      }
    buscar(){
      this.navCtrl.push(BuscarpulseraPage);
    }
   
  monitorizar(){
    if(this.monitori==true){
      console.log("Es true");
      this.bubcleinfinito();
    }else{
      console.log("ES false");
      this.cancelarMonitorizacion();
    }
  }
  getDatos(){
    let a = this.monit.getDatos();
    console.log("Datos almacenados hasta el momento:");
    console.log(a);
  }
  borrardatos(){
    this.monit.borrardatos();
  }
  sendsms(){
    this.monit.sendsms();
  }
  prueba(){
    console.log("Metodo de prueba");
    var arr = [];
  arr[0] = "Jani";
  arr[1] = "Hege";
  arr[2] = "Stale";
  arr[3] = "Kai Jim";
  arr[4] = "Borge";

  console.log(arr.join());
  arr.splice(5, 1, "SERGIO");
  console.log(arr.join());
  }
  bubcleinfinito(){
    this.monit.escuchar();
    this.intervalo = setInterval(() => this.llamada(this.monit), 20000);
  }
  llamada(monit:MonitorService){
    monit.recursivo();
  }
  cancelarMonitorizacion(){
    console.log("Monitorizacion cancelada");
    window.clearInterval(this.intervalo);
    this.monit.cancelarEscucha();
  }
}
