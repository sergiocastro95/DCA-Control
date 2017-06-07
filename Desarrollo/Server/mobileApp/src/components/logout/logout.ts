import { Component } from '@angular/core';
import { NavController, App, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../../pages/login/login';
/*
  Generated class for the Logout component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'logout',
  templateUrl: 'logout.html'
})
export class LogoutComponent {

  constructor(public navCtrl: NavController, private storage: Storage, private app:App, public alerCtrl:AlertController) {}
  
  logout(){
    let alert = this.alerCtrl.create({
    title: 'Cerrar sesión',
    message: '¿Quieres cerrar sesión? Será imposible continuar la monitorización.',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Cerrar sesión',
        handler: () => {
          console.log('Buy clicked');
            this.storage.remove('userid');
            this.app.getRootNav().setRoot(LoginPage);
        }
      }
    ]
  });
  alert.present();
   
    //this.navCtrl.setRoot(LoginPage);
  }

}
