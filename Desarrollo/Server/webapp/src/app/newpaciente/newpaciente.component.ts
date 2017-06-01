import { Component, OnInit } from '@angular/core';
import {NewpacienteService} from './newpaciente.service';
import {RouterModule,ActivatedRoute,Router, Params} from '@angular/router';
@Component({
  selector: 'app-newpaciente',
  templateUrl: './newpaciente.component.html',
  styleUrls: ['./newpaciente.component.css'],
  providers: [NewpacienteService]
})
export class NewpacienteComponent implements OnInit {
  medicos = [];
  iniciado = false;
  doctorselected = 0;
  constructor(private newpacienteService: NewpacienteService,  private router:Router) { 
    this.newpacienteService.getmedicos().subscribe(response=>{
    response.forEach(element =>{
      this.medicos.push({'nombre': element.nombre, 'id': element.id});
    });
     this.iniciado = true;
    },error =>{
      alert("Error al recuperar médicos");
    }
    );
   
  }
  crear(sip, password,passwordd,nombre, apellidos){
     if(password==passwordd){
       if(this.doctorselected!=0){
         this.newpacienteService.crearPaciente(sip,password, nombre,apellidos,this.doctorselected, sessionStorage.getItem("userid")).subscribe(response=>{
                        if(response.response == "Ok"){
                          this.router.navigate(['/panel']);
                          }else{
                            alert("Error al crear el paciente");
                          }
                  },
                  error => {
                          alert("Error en la petición");
                  }
      );
       }else{
         alert("Debes seleccionar un médico");
       }
     }else{
       alert("Error: las contraseñas no coinciden");
     }
  }
  ngOnInit() {
  }
  onChange(deviceValue) {
    console.log(deviceValue);
    this.doctorselected = deviceValue;

}

}
