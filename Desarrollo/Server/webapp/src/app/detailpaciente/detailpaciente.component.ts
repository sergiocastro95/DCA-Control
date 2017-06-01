import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DetailpacienteService} from './detailpaciente.service'
@Component({
  selector: 'app-detailpaciente',
  templateUrl: './detailpaciente.component.html',
  styleUrls: ['./detailpaciente.component.css'],
  providers:[DetailpacienteService]
})
export class DetailpacienteComponent implements OnInit {
  public sip;
  public nombre;
  public apellidos;
  public id;
  public responsable;
  public telefono;
  public email;
  
  public hist:historial;
  
  public espadre;
  constructor( private route: ActivatedRoute, private router: Router, private pacienteservice: DetailpacienteService) { 
    this.route.params.subscribe(params => {
            if(params['id']!=null){
                this.sip = +params['id'];
                this.pacienteservice.getpacienteById(this.sip).subscribe(response=>{
                  this.sip = response[0].sip;
                  this.nombre = response[0].nombre;
                  this.apellidos = response[0].apellidos;
                  console.log(response);
                  
                  },
                  error => {
                        alert("Error en la petición");
                  }
                );
                this.pacienteservice.getusubypac(this.sip).subscribe(response=>{
                  //this.responsable.id = response[0].id;
                  this.id = response[0].id;
                  this.responsable = response[0].nombre;
                  this.email = response[0].email;
                  this.telefono = response[0].telefono;
                  if(this.id==sessionStorage.getItem("userid")){
                    this.espadre=true;
                  }
                  },
                  error => {
                        alert("Error en la petición");
                  }
                );

                this.pacienteservice.getHistbypac(this.sip).subscribe(response=>{
                  //this.responsable.id = response[0].id;
                  this.hist=response;
                  this.parsearFecha();
                  },
                  error => {
                        alert("Error en la petición");
                  }
                );
                //pedir aqui las enfermedades el usuario de contacto, el medico, etc


            }else{
               this.router.navigate(['/pacientes']);
            }
         });
  }
  parsearFecha(){
    let fechas;
    let splitear;
    let f;
    for(var x = 0; x <=Object.keys(this.hist).length;x++){f
      f = this.hist[x].fecha;
      splitear = f.split(" ",1);
      console.log("split 1");
      console.log(splitear);
      fechas = splitear[0].split("-");
      this.hist[x].fecha = fechas[2]+"/"+fechas[1]+"/"+fechas[0];
      
    }
  }
editarperfil(){
  
}
  ngOnInit() {
    
  }

}
class historial {
  public id;
  public paciente;
  public descripcion;
  public fecha;
}