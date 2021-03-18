import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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

  getScheduleData(userId){
    return this._http.get<any>(_apiUrl + 'scheduled-user-data?user_id='+userId);
    // return this._http.get<any>(_apiUrl + 'membership');
    // return {
    //   error : false,
    //   data : [
    //     {date:'2021-03-19',time:'10:00',event:'math'},
    //     {date:'2021-03-19',time:'11:00',event:'physics'},
    //     {date:'2021-03-19',time:'12:00',event:'chemistry'},
    //     {id: 4,date:'2021-03-20',time:'10:00',event:'math'},
    //     {id: 5,date:'2021-03-20',time:'11:00',event:'physics'},
    //     // {id: 6,date:'2021-03-20',time:'12:00',event:'chemistry'},
    //     // {id: 7,date:'2021-03-21',time:'10:00',event:'math'},
    //     // {id: 8,date:'2021-03-21',time:'11:00',event:'physics'},
    //     // {id: 9,date:'2021-03-21',time:'12:00',event:'chemistry'},
    //     // {id: 10,date:'2021-03-22',time:'10:00',event:'math'},
    //     // {id: 11,date:'2021-03-22',time:'11:00',event:'physics'},
    //     // {id: 12,date:'2021-03-22',time:'12:00',event:'chemistry'},
    //   ]
    // }
    // 
  }
  
}