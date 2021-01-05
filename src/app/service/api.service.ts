import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private _APIURL = environment.APIURL;
  private header;
  
  constructor(private _http : HttpClient,private _router : Router) {
    this.header = new HttpHeaders()
        .set("Authorization", 'Bearer '+localStorage.getItem("accessToken"))
        .set("Accept","application/json");
  }
  // How to send the data + Header Example is below
  // return this.http.post<any>(this._APIURL + 'update/user/profile',data,{headers: this.header});

  // Storing the User Info Locally
  storeUserLocally(data){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    localStorage.setItem('accessToken',data.data.accessToken);
    localStorage.setItem('userInfo',JSON.stringify(data.data));
    this._router.navigate(['/dashboard']);
  }
  // Logging Out the Current User
  logoutUser():void{
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    this._router.navigate(['/']);
  }

  // Checking the Authentication for User
  isAuthenticated(){
    return !!localStorage.getItem('accessToken');
  }

  // Error Handling in any API
  errorHandler(error){
    if(error instanceof HttpErrorResponse && error.status == 401){
      this.logoutUser();
      this._router.navigate(['/login']);
    }
  }

  // API Implementation Start
  userLoginAPI(formData){
    return this._http.post<any>(this._APIURL+'login',formData);
  }

  userRegistrationAPI(formData){
    return this._http.post<any>(this._APIURL+'signup',formData);
  }

  getTeacherList(){
    return this._http.get<any>(this._APIURL + 'teacher');
  }

  getCourseList(){
    return this._http.get<any>(this._APIURL + 'course');
  }

  
}