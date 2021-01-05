import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _api:APIService) { }
  userAuthentication = false;
  ngOnInit(): void {
    let token = this._api.isAuthenticated();
    if(token){
      this.userAuthentication = true;
    }else{
      this.userAuthentication = false;
    }
  }

  userLogout(){
    this.userAuthentication = false;
    this._api.logoutUser();
  }

  

}
