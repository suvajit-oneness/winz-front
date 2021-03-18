import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { HttpClientModule } from '@angular/common/http';
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
// for eventCalender Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// for EventCalender Module End
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    CourseListComponent,
    CourseDetailsComponent,
    TeacherProfileComponent,
    DashboardComponent,
    SidebarComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    SubscribedCourseComponent,
    MembershipComponent,
    SubscriptionThankyouComponent,
    QuestionComponent,
    ChapterComponent,
    ContactusComponent,
    SubjectCategoryComponent,
    EventCalenderComponent
  ],
  imports: [
    BrowserModule,NgxUiLoaderModule,NgxUiLoaderRouterModule,NgxUiLoaderHttpModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule,CommonModule,
    BrowserAnimationsModule,NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
