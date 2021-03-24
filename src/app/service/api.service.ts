import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

var _apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class APIService {

  private header;
  
  constructor(private _http : HttpClient,private _router : Router) {
    this.header = new HttpHeaders()
        .set("Authorization", 'Bearer '+localStorage.getItem("accessToken"))
        .set("Accept","application/json");
  }
  // How to send the data + Header Example is below
  // return this.http.post<any>(_apiUrl + 'update/user/profile',data,{headers: this.header});

  // Storing the User Info Locally
  storeUserLocally(data){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    localStorage.setItem('accessToken',data.data.accessToken);
    localStorage.setItem('userInfo',JSON.stringify(data.data));
    // window.location.href="/dashboard";
    this._router.navigate(['/dashboard']);
  }

  updateUserLocally(data){
    localStorage.removeItem('userInfo');
    localStorage.setItem('userInfo',JSON.stringify(data.data));
  }

  // Logging Out the Current User
  logoutUser():void{
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    window.location.href="/";
    // this._router.navigate(['/']);
  }

  // Checking the Authentication for User
  isAuthenticated(){
    return !!localStorage.getItem('accessToken');
  }

  getUserDetailsFromStorage(){
    let user = localStorage.getItem('userInfo');
    return JSON.parse(user);
  }

  // Error Handling in any API
  errorHandler(error){
    if(error instanceof HttpErrorResponse && error.status == 401){
      this.logoutUser();
      this._router.navigate(['/login']);
    }
  }

  getHomePageContent(){
    return this._http.get<any>(_apiUrl+'home_page_content');
  }

  // API Implementation Start
  userLoginAPI(formData){
    return this._http.post<any>(_apiUrl+'login',formData);
  }

  userRegistrationAPI(formData){
    return this._http.post<any>(_apiUrl+'signup',formData);
  }

  updateUserProfile(formData){
    return this._http.post<any>(_apiUrl + 'update_profile',formData);
  }

  getTeacherList(){
    return this._http.get<any>(_apiUrl + 'teacher');
  }

  getTeacherDetails(teacherId){
    return this._http.get<any>(_apiUrl + 'teacher/'+teacherId);
  }

  getCourseList(){
    return this._http.get<any>(_apiUrl + 'course');
  }

  getCourseDetails(courseId,userId=0){
    return this._http.get<any>(_apiUrl + 'course/'+courseId+'/?userId='+userId);
  }

  updateUserPassword(data){
    return this._http.post<any>(_apiUrl + 'change/password',data);
  }

  getUserSubscribedCourses(userId,subscribedId=0){
    return this._http.get<any>(_apiUrl + 'subscribed/course/'+subscribedId+'/?userId='+userId);
  }

  postUserSubscribedCourse(formData){
    return this._http.post<any>(_apiUrl + 'subscribed/course',formData);
  }

  getMembershipList(){
    return this._http.get<any>(_apiUrl + 'membership');
  }

  getSubjectCategory(categoryId){
    return this._http.get<any>(_apiUrl + 'subject-category?categoryId='+categoryId);
  }

  getChapterList(subjectCategoryId = 0,chapterId = 0){
    return this._http.get<any>(_apiUrl + 'chapter?subjectCategoryId='+subjectCategoryId+'&chapterId='+chapterId);
  }

  getQuestionList(subjectCategoryId = 0,chapterId = 0){
    return this._http.get<any>(_apiUrl + 'question?subjectCategoryId='+subjectCategoryId+'&chapterId='+chapterId);
  }

  postContactUsForm(formData){
    return this._http.post<any>(_apiUrl + 'contact-us',formData);
  }

  getScheduleData(teacherId){
    return this._http.get<any>(_apiUrl + 'scheduled-teacher-data?teacherId='+teacherId);
  }

  saveScheduleUserData(teacherId,FormData){
    return this._http.post<any>(_apiUrl + 'scheduled-teacher-data/save?teacherId='+teacherId,FormData);
  }
  
}