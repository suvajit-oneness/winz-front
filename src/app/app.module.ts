import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/layouts/header/header.component';
import { FooterComponent } from './component/layouts/footer/footer.component';
import { LoginComponent } from './component/auth/login/login.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { CourseListComponent } from './component/course-list/course-list.component';
import { CourseDetailsComponent } from './component/course-details/course-details.component';
import { TeacherProfileComponent } from './component/teacher-profile/teacher-profile.component';
import { FormsModule , ReactiveFormsModule, FormControl} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { SidebarComponent } from './component/layouts/sidebar/sidebar.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { SubscribedCourseComponent } from './component/subscribed-course/subscribed-course.component';
import { MembershipComponent } from './component/membership/membership.component';
import { SubscriptionThankyouComponent } from './component/layouts/subscription-thankyou/subscription-thankyou.component';
import { QuestionComponent } from './component/question/question.component';
import { ChapterComponent } from './component/chapter/chapter.component';
import { ContactusComponent } from './component/contactus/contactus.component';
import { SubjectCategoryComponent } from './component/subject-category/subject-category.component';
import { EventCalenderComponent } from './component/event-calender/event-calender.component';
// Calender Module
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ScheduleComponent } from './component/schedule/schedule.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ConnectionServiceModule } from 'ng-connection-service';
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);
// for EventCalender Module End
// Global Error Catch Implement
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from 'src/app/Interceptor/http-error.interceptor';
import { BookingThankyouComponent } from './component/layouts/booking-thankyou/booking-thankyou.component';
import { BookingRequestComponent } from './component/booking-request/booking-request.component';
import { BookingHistoryComponent } from './component/booking-history/booking-history.component';
import { ZoomMeetingComponent } from './component/zoom-meeting/zoom-meeting.component';
import { TeacherListComponent } from './component/teacher-list/teacher-list.component';
// Global Error Catch Implement END

// export class RajeevErrorHandler implements ErrorHandler{
//   handleError(error: Error){
//     if(Error){
//       console.log(error);
//     }
//   }
// }

@NgModule({
  declarations: [
    AppComponent,PageNotFoundComponent,HomeComponent,HeaderComponent,
    FooterComponent,LoginComponent,SignupComponent,CourseListComponent,CourseDetailsComponent,
    TeacherProfileComponent,DashboardComponent,SidebarComponent,EditProfileComponent,ChangePasswordComponent,
    SubscribedCourseComponent,MembershipComponent,SubscriptionThankyouComponent,QuestionComponent,ChapterComponent,
    ContactusComponent,SubjectCategoryComponent,EventCalenderComponent,ScheduleComponent, BookingThankyouComponent, BookingRequestComponent, BookingHistoryComponent, ZoomMeetingComponent, TeacherListComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,NgxUiLoaderModule,NgxUiLoaderRouterModule,NgxUiLoaderHttpModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule,CommonModule,FullCalendarModule,
    ConnectionServiceModule,
    ToastrModule.forRoot({
      timeOut : 2000,
      positionClass : 'toast-top-right',
      preventDuplicates : false,
    }),
  ],
  providers: [
    // {provide : ErrorHandler,useClass : RajeevErrorHandler}
    {provide : HTTP_INTERCEPTORS,useClass:HttpErrorInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
