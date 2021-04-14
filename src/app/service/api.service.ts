import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

var originalURL = environment.apiUrl;
var _apiUrl = originalURL + 'api/v1/';

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

  routeIntended(path : any = ''){
    localStorage.setItem('routeIntended',path);
  }

  // Storing the User Info Locally
  storeUserLocally(data){
    let routeIntended = localStorage.getItem('routeIntended');
    localStorage.clear();
    localStorage.setItem('accessToken',data.data.accessToken);
    localStorage.setItem('userInfo',JSON.stringify(data.data));
    // window.location.href="/dashboard";
    this._router.navigate([(routeIntended) ? routeIntended : '/dashboard']);
  }

  updateUserLocally(data){
    localStorage.removeItem('userInfo');
    localStorage.removeItem('bookingData');
    localStorage.setItem('userInfo',JSON.stringify(data.data));
  }

  // Logging Out the Current User
  logoutUser():void{
    localStorage.clear();
    window.location.href = environment.projectPath;
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
    return this._http.get<any>(_apiUrl + 'course/'+courseId+'?userId='+userId);
  }

  updateUserPassword(data){
    return this._http.post<any>(_apiUrl + 'change/password',data);
  }

  getUserSubscribedCourses(userId,subscribedId=0){
    return this._http.get<any>(_apiUrl + 'subscribed/course/'+subscribedId+'?userId='+userId);
  }

  postUserSubscribedCourse(formData){
    return this._http.post<any>(_apiUrl + 'subscribed/course',formData);
  }

  getMembershipList(userId,userType){
    return this._http.get<any>(_apiUrl + 'membership?userId='+userId+'&userType='+userType);
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
  
  getTeacherAvailableSlots(teacherId){
    return this._http.get<any>(_apiUrl + 'teacher-slots?teacherId='+teacherId);
  }

  createStripeTokenCharge(formData){
    return this._http.post<any>(_apiUrl + 'create-stripe-charge/by-token',formData);
  }

  purchaseBookingSlot(formData){
    return this._http.post<any>(_apiUrl + 'purchaseBookingSlot-mentor',formData);
  }

  getBookingRequest(teacherId){
    return this._http.get<any>(_apiUrl + 'booking-history?teacherId='+teacherId);
  }

  getPaymentHistory(userId){
    return this._http.get<any>(_apiUrl + 'slot-booking-history?userId='+userId);
  }

  getZoomMeetingData(parameters){
    return this._http.get<any>(_apiUrl + 'zoom/meetings'+parameters);
  }

  saveZoomMeetingData(formData){
    return this._http.post<any>(_apiUrl + 'zoom/meeting',formData);
  }

  deleteZoomMeetings(deleteData){
    return this._http.post<any>(_apiUrl + 'zoom/meeting/delete',deleteData);
  }

  buyMemberShipforUser(formData){
    return this._http.post<any>(_apiUrl + 'buy_membership',formData);
  }

  getUserMembershipHistory(userId,userType){
    return this._http.get<any>(_apiUrl + 'user-membership-details?userId='+userId+'&userType='+userType);
  }

  getConatctUsDataToShow(){
    return this._http.get<any>(_apiUrl + 'contact-us-data');
  }

  getTestimonialsList(testimonalId = 0){
    return this._http.get<any>(_apiUrl + 'testimonials?id='+testimonalId);
  }

  getBlogsList(blogId = 0){
    return this._http.get<any>(_apiUrl + 'blogs?id='+blogId);
  }

  getSettingSEOData(key = ''){
    return this._http.get<any>(_apiUrl + 'settings?key='+key);
  }
}