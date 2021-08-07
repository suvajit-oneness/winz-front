import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { LoginComponent } from './component/auth/login/login.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { BlogDetailsComponent } from './component/blog/blog-details/blog-details.component';
import { BlogComponent } from './component/blog/blog.component';
import { BookingHistoryComponent } from './component/booking/booking-history/booking-history.component';
import { BookingRequestComponent } from './component/booking/booking-request/booking-request.component';
import { MemberShipBookingThankyouComponent } from './component/booking/member-ship-booking-thankyou/member-ship-booking-thankyou.component';
import { CancellationPolicyComponent } from './component/policy/cancellation-policy/cancellation-policy.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ChapterComponent } from './component/CategoryChapter/chapter/chapter.component';
import { ContactusComponent } from './component/contactus/contactus.component';
import { CourseDetailsComponent } from './component/course-list/course-details/course-details.component';
import { CourseListComponent } from './component/course-list/course-list.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EditProfileComponent } from './component/auth/edit-profile/edit-profile.component';
import { EventCalenderComponent } from './component/event-calender/event-calender.component';
import { FaqComponent } from './component/faq/faq.component';
import { HomeComponent } from './component/home/home.component';
import { BookingThankyouComponent } from './component/layouts/booking-thankyou/booking-thankyou.component';
import { SubscriptionThankyouComponent } from './component/layouts/subscription-thankyou/subscription-thankyou.component';
import { MembershipComponent } from './component/membership/membership.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './component/policy/privacy-policy/privacy-policy.component';
import { QuestionComponent } from './component/question/question.component';
import { RefundPolicyComponent } from './component/policy/refund-policy/refund-policy.component';
import { ScheduleComponent } from './component/schedule/schedule.component';
import { SubjectCategoryComponent } from './component/subject-category/subject-category.component';
import { TeacherListComponent } from './component/teacher-list/teacher-list.component';
import { TeacherProfileComponent } from './component/teacher-profile/teacher-profile.component';
import { TermsAndConditionComponent } from './component/policy/terms-and-condition/terms-and-condition.component';
import { TestimonialComponent } from './component/testimonial/testimonial.component';
import { UserMemberShipComponent } from './component/user-member-ship/user-member-ship.component';
import { ZoomMeetingComponent } from './component/zoom-meeting/zoom-meeting.component';
import { AuthGuardService } from './service/auth-guard.service';
import { ChapterPurchaseHistoryComponent } from './component/CategoryChapter/chapter-purchase-history/chapter-purchase-history.component';
import { TeacherCourseComponent } from './component/course-list/teacher-course/teacher-course.component';
import { AddTeacherCourseComponent } from './component/course-list/teacher-course/add-teacher-course/add-teacher-course.component';
import { EditTeacherCourseComponent } from './component/course-list/teacher-course/edit-teacher-course/edit-teacher-course.component';
import { CourseChapterListComponent } from './component/course-list/teacher-course/course-chapter-list/course-chapter-list.component';
import { AddCourseChapterComponent } from './component/add-course-chapter/add-course-chapter.component';
import { EditCourseChapterComponent } from './component/edit-course-chapter/edit-course-chapter.component';
import { CourseChapterSubchapterListComponent } from './component/course-chapter-subchapter-list/course-chapter-subchapter-list.component';
import { CourseChapterSubchapterCreateComponent } from './component/course-chapter-subchapter-create/course-chapter-subchapter-create.component';
import { CourseChapterSubchapterEditComponent } from './component/course-chapter-subchapter-edit/course-chapter-subchapter-edit.component';
import { QuestionListComponent } from './component/question/question-list/question-list.component';
import { QuestionAddComponent } from './component/question/question-add/question-add.component';
import { QuestionEditComponent } from './component/question/question-edit/question-edit.component'

const routes: Routes = [
  // before Login Routes
  {path : '', component : HomeComponent, pathMatch:'full'},
  {path : 'login', component : LoginComponent},
  {path : 'signup', component : SignupComponent},
  {path : 'course-list', component : CourseListComponent},
  {path : 'teacher-list',component : TeacherListComponent},
  {path : 'membership', component : MembershipComponent},
  {path : 'course-details/:courseId', component : CourseDetailsComponent},
  {path : 'teacher/profile/:teacherId', component : TeacherProfileComponent},
  {path : 'testimonials',component : TestimonialComponent},
  {path : 'blogs',component : BlogComponent},
  {path : 'blog-details/:blogId',component : BlogDetailsComponent},
  {path : 'terms-and-condition',component : TermsAndConditionComponent},
  {path : 'privacy-policy',component : PrivacyPolicyComponent},
  {path : 'cancellation-policy',component : CancellationPolicyComponent},
  {path : 'refund-policy',component : RefundPolicyComponent},
  {path : 'faq',component : FaqComponent},
  {path : 'about-us',component : AboutUsComponent},
  {path : 'contact-us', component : ContactusComponent},
  {path : 'chapter/:chapterId/category', component : SubjectCategoryComponent},
  {path : 'chapter/:chapterId/category/:categoryId/subchapter', component : ChapterComponent},
  {path : 'chapter/:chapterId/category/:categoryId/subchapter/:subChapterId/question', component : QuestionComponent},

  // After Login Routes
  {path : 'dashboard', component : DashboardComponent,canActivate:[AuthGuardService]},
  {path : 'user/profile', component : EditProfileComponent,canActivate:[AuthGuardService]},
  {path : 'user/password/change', component : ChangePasswordComponent,canActivate:[AuthGuardService]},
  {path : 'teacher/course/list', component : TeacherCourseComponent},
  {path : 'teacher/course/list/create', component : AddTeacherCourseComponent},
  {path : 'teacher/course/list/:courseId/edit', component : EditTeacherCourseComponent},
  {path : 'teacher/course/:courseId/chapter/list',component : CourseChapterListComponent},
  {path : 'teacher/course/:courseId/chapter/create', component : AddCourseChapterComponent},
  {path : 'teacher/course/:courseId/chapter/:chapterId/edit', component : EditCourseChapterComponent},
  // {path : 'user/subscribed/course', component : SubscribedCourseComponent,canActivate:[AuthGuardService]},
  {path : 'user/subscription/thankyou/:subscriptionId', component : SubscriptionThankyouComponent,canActivate:[AuthGuardService]},
  {path : 'schedule', component : ScheduleComponent},
  {path : 'events', component : EventCalenderComponent},
  {path : 'booking-thankyou',component:BookingThankyouComponent},
  {path : 'booking-request', component:BookingRequestComponent},
  {path : 'slot-booking-history',component : BookingHistoryComponent},
  {path : 'user/zoom-meeting',component : ZoomMeetingComponent},
  {path : 'membership/booking-thankyou',component : MemberShipBookingThankyouComponent},
  {path : 'user/membership',component : UserMemberShipComponent},
  {path : 'teacher/course/:courseId/chapter/:chapterId/subchapter/list',component:CourseChapterSubchapterListComponent},
  {path : 'teacher/course/:courseId/chapter/:chapterId/subchapter/create',component:CourseChapterSubchapterCreateComponent},
  {path : 'teacher/course/:courseId/chapter/:chapterId/subchapter/:subChapterId/edit', component: CourseChapterSubchapterEditComponent},
  {path : 'teacher/:courseId/:chapterId/:subChapterId/question', component:QuestionListComponent},
  {path : 'teacher/:courseId/:chapterId/:subChapterId/question/create', component:QuestionAddComponent},
  {path : 'teacher/question/edit/:questionId', component:QuestionEditComponent},
  
  // {path : 'user/chapter/edit/:chapterId', component:EditCategoryChapterComponent},
  // {path : 'chapter/purchase/thankyou', component : ChapterBookingThankyouComponent},
  {path : 'chaper/purchase/history', component : ChapterPurchaseHistoryComponent},
  
  {path : '**', component : PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }