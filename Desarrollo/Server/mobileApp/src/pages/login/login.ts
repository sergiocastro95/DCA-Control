import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Login} from '../../providers/login';
import { AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public alert;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loginservice:Login, public alerCtrl:AlertController, private storage: Storage) {}

  logForm(sip, password) {

     this.loginservice.login(sip, password).then(data => {

          let aux:any = data;
          //console.log(aux.response);
          if(aux.response=="Ok"){
            this.navCtrl.setRoot(TabsPage);
          }else{
            this.alert = this.alerCtrl.create({
              title: 'Error al hacer login',
              subTitle: 'Contraseña o usuario incorrectos',
              buttons: ['Aceptar']
              
            });
            this.alert.present();
          }
    });
  }

}
