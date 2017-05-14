import { Component, OnInit } from '@angular/core';
import {LoginserviceService} from './loginservice.service';
import {RouterModule,ActivatedRoute,Router, Params} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginserviceService]
})
export class LoginComponent implements OnInit {

  constructor(private loginservice: LoginserviceService,  private router:Router) { }

  doLogin(dni, password) {
     event.preventDefault();
     this.loginservice.login();
     //this.loginService.postLogin(dni, password);
     alert("LOGIIIIIIIN");
     if(1==1){
      this.router.navigate(['/inicio']);
     }else{

     }

 }
 resgristro(dni, password) {
     event.preventDefault();
     this.loginservice.registro();
     alert("registro");
     
 }
  ngOnInit() {
   
  }
  
}