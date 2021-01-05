import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _api:APIService,private _router:Router) { }

  canActivate():boolean{
    let token = this._api.isAuthenticated();
    if(token){
      return true;
    }else{
      this._router.navigate(['/login']);
      return false;
    }
  }
}
