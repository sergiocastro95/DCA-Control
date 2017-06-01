import { Component, OnInit } from '@angular/core';
import {RouterModule,ActivatedRoute,Router, Params} from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public rol;
  public highlightedDiv;
  constructor(private router:Router) {
    this.rol = sessionStorage.getItem("rol");
    this.highlightedDiv = 1;
   }

  ngOnInit() {
    
  }
  toggleHighlight(newValue: number) {
      this.highlightedDiv = newValue;
  }
  logout(){
    sessionStorage.clear();
     this.router.navigate(['/login']);
  }
}
