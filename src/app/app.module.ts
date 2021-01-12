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
    QuestionComponent
  ],
  imports: [
    BrowserModule,NgxUiLoaderModule,NgxUiLoaderRouterModule,NgxUiLoaderHttpModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule,CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
