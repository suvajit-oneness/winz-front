import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EncodeDecodeBase64 } from 'src/globalFunction';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public EncodeDecodeBase64 = EncodeDecodeBase64;
  
  constructor(
    private _api:APIService,
    private _loader : NgxUiLoaderService
  ) {
    this._loader.startLoader('loader');
  }

  public courseList : any = [];
  public teacherList : any = [];

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getHomePageContent();
    this.getCourseList();
    this.getTeacherList();
    this._loader.stopLoader('loader');
    
  }

  // get home Page Banner Headings and Images
  public HomeHeader : any = {};public HomeBanner : any = {};public HomeBannerContent : any = [];
  public HomeCourses : any = {};public HomeTeacher : any = {};
  getHomePageContent(){
    this._api.getHomePageContent().subscribe(
      res => {
          if(res.error == false){
            this.HomeHeader = res.data.header[0];
            this.HomeCourses = res.data.courses[0];
            this.HomeTeacher = res.data.teacher[0];
            this.HomeBanner = res.data.banner[0];
            this.HomeBannerContent = res.data.bannerContent;
            // console.log(res.data);
          }
      }
    )
  }

  /*********Get Course List *********/
  getCourseList(){
    this._api.getCourseList().subscribe(
        res => {
          this.courseList = res.data;
        },err => {}
    )
  }

  /*********Get Teacher List *********/
  getTeacherList(){
      this._api.getTeacherList().subscribe(
          res => {
            this.teacherList = res.data;
            // console.log(this.teacherList);
          },err => {}
      )
  }

  commaSeparateTeacher(teacherList){
    let teacher = '';
    Object.keys(teacherList).forEach((key)=>{
      teacher += teacherList[key].name+',';
    });
    teacher = teacher.slice(0, -1);// removing the last , sign from String
    return teacher;
  }

}
