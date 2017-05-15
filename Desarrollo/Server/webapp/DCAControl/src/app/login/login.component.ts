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
  private login;
  doLogin(email, password) {
    alert(email);
    alert(password);
     event.preventDefault();
     this.loginservice.login(email, password).subscribe(response=>{
                 this.login = response;
                        if(response.response == "Ok"){
                          sessionStorage.setItem("userid", response.id);
                          sessionStorage.setItem("rol", response.rol);
                          this.router.navigate(['/log']);
                        }else{
                          alert("Error");
                        }
                },
                error => {
                        alert("Error en la petición");
                }
            );  

 }
 resgristro(dni, password) {
     event.preventDefault();
     this.loginservice.registro();
     alert("registro");
     
 }
  ngOnInit() {
    if(sessionStorage.getItem("userid") === null){
      alert("No hay sesión iniciada");
    }else{
      this.router.navigate(['/log']);
    }
  }
  
}