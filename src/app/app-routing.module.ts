import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ChapterComponent } from './component/chapter/chapter.component';
import { ContactusComponent } from './component/contactus/contactus.component';
import { CourseDetailsComponent } from './component/course-details/course-details.component';
import { CourseListComponent } from './component/course-list/course-list.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { EventCalenderComponent } from './component/event-calender/event-calender.component';
import { HomeComponent } from './component/home/home.component';
import { SubscriptionThankyouComponent } from './component/layouts/subscription-thankyou/subscription-thankyou.component';
import { MembershipComponent } from './component/membership/membership.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { QuestionComponent } from './component/question/question.component';
import { SubjectCategoryComponent } from './component/subject-category/subject-category.component';
import { SubscribedCourseComponent } from './component/subscribed-course/subscribed-course.component';
import { TeacherProfileComponent } from './component/teacher-profile/teacher-profile.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {path : '', component : HomeComponent, pathMatch:'full'},
  {path : 'login', component : LoginComponent},
  {path : 'signup', component : SignupComponent},
  {path : 'dashboard', component : DashboardComponent,canActivate:[AuthGuardService]},
  {path : 'user/profile', component : EditProfileComponent,canActivate:[AuthGuardService]},
  {path : 'user/password/change', component : ChangePasswordComponent,canActivate:[AuthGuardService]},
  {path : 'user/subscribed/course', component : SubscribedCourseComponent,canActivate:[AuthGuardService]},
  {path : 'user/subscription/thankyou/:subscriptionId', component : SubscriptionThankyouComponent,canActivate:[AuthGuardService]},
  {path : 'course-list', component : CourseListComponent},
  {path : 'membership', component : MembershipComponent},
  {path : 'course-details/:courseId', component : CourseDetailsComponent},
  {path : 'teacher/:teacherId', component : TeacherProfileComponent},
  {path : 'category/subject-category/:categoryId', component : SubjectCategoryComponent},
  {path : 'category/subject-category/chapter/:subjectCategoryId', component : ChapterComponent},
  {path : 'category/subject-category/chapter/question/:subjectCategory/:chapterId', component : QuestionComponent},
  {path : 'events', component : EventCalenderComponent},

  {path : 'contact-us', component : ContactusComponent},
  {path : '**', component : PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }