import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authService';
import { ApiService } from '../../core/services/apiService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public nameCurrentUser = "";
  
  constructor(
    location: Location,  
    private element: ElementRef, 
    private router: Router, 
    private autService: AuthService,
    private _apiService: ApiService) {
    this.location = location;
    
  }

  ngOnInit() {
    this.loadUser();
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  loadUser() {
    this._apiService.getById('users', this.autService.currentUserValue.id).then(i => {      
      this.nameCurrentUser = i.name;
    });
  }

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Lists';
  }

  logout() {
    this.autService.logout();
    this.router.navigate(["/login"]);
  }

}
