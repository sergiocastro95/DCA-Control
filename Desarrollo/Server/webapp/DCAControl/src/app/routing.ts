//Importamos librerias del core y router necesarias
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Importamos todos los components que se redireccionen
import { AppComponent } from './app.component';
import { LoginComponent }   from './login/login.component';
import { LogComponent }   from './log/log.component';
import { InicioComponent }   from './inicio/inicio.component';
import { UsuariosComponent }   from './usuarios/usuarios.component';
import { PerfilComponent }   from './perfil/perfil.component';
import { NewpacienteComponent }   from './newpaciente/newpaciente.component';
import { PacientesComponent }   from './pacientes/pacientes.component';
import { GuiaComponent }   from './guia/guia.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'log', component: LogComponent,
    children: [
      { path: '', redirectTo: '/log/inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent},
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'newpaciente', component: NewpacienteComponent },
      { path: 'pacientes', component: PacientesComponent },
      { path: 'guia', component: GuiaComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: "**",redirectTo:"/inicio"}
    ]
  },
  { path: "**",redirectTo:"/login"}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}