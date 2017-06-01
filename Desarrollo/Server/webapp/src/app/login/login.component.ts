import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {RouterModule,ActivatedRoute,Router, Params} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
public ismedico;
  constructor(private loginservice: LoginService,  private router:Router) {
    this.ismedico = false;
   }
  doLogin(email, password) {
     event.preventDefault();
     this.loginservice.login(email, password).subscribe(response=>{
                        if(response.response == "Ok"){
                          sessionStorage.setItem("userid", response.id);
                          sessionStorage.setItem("rol", response.rol);
                          this.router.navigate(['/panel']);
                        }else{
                          alert("usuario o contraseña incorrecta");
                        }
                },
                error => {
                        alert("Error en la petición");
                }
            );  

 }
 registro(email, nombre, password,passwordd, telefono, medicoq ) {
     event.preventDefault();
     let rol = 0;
     alert(this.ismedico);
     if(password==passwordd){
       if(this.ismedico == false){
       rol = 1;
     }else if(this.ismedico==true){
       rol = 2;
     }
     this.loginservice.registro(email, nombre,password,telefono, rol).subscribe(response=>{
                      if(response.response == "Ok"){
                         this.doLogin(email,password);
                        }else{
                          alert("Error al registrar");
                        }
                },
                error => {
                        alert("Error en la petición");
                }
     );
     }else{
       alert("Error: las contraseñas no coinciden");
     }
    

     
 }
  ngOnInit() {
    if(sessionStorage.getItem("userid") === null){
      console.log("No hay sesión iniciada");
    }else{
      this.router.navigate(['/panel']);
    }
  }
  onchange(){
  if(this.ismedico==false){
    this.ismedico = true;
  }else{
    this.ismedico = false;
  }
}
}
