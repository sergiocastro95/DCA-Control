//Importamos librerias del core y router necesarias
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Importamos todos los components que se redireccionen
import { AppComponent } from './app.component';
import { LoginComponent }   from './login/login.component';
import { InicioComponent }   from './inicio/inicio.component';
import { UsuariosComponent }   from './usuarios/usuarios.component';
import { PerfilComponent }   from './perfil/perfil.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent,
    children: [
      { path: '', redirectTo: '/inicio', pathMatch: 'full' },
      { path: 'usuarios', component: UsuariosComponent },
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