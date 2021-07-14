import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-teacher-course',
  templateUrl: './edit-teacher-course.component.html',
  styleUrls: ['./edit-teacher-course.component.css']
})
export class EditTeacherCourseComponent implements OnInit {

  constructor(private _api:APIService,private _loader : NgxUiLoaderService,private _activatedRoute:ActivatedRoute) {}

  public userInfo : any = {};
  public successMsg = '';public errorMsg = '';public fileFormatError = '';
  public selectedFile : File;public hasFile : boolean;
  public courseId : any = 0;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.userInfo = this._api.getUserDetailsFromStorage();
    this.getCategory();
    this.courseId = this._activatedRoute.snapshot.paramMap.get('courseId');
    this.getCourseDetails(this.courseId);
    this.hasFile = false;
  }

  course : any = {};
  getCourseDetails(courseId) {
    this._api.editTeacherCourse(courseId).subscribe(
      res => {
        console.log(res);
        this.course = res.data;
        this.courseImage = this.course.course_image;
      }
    )
  }

  public categorydata = [];
  getCategory(){
    this.categorydata = [];
    this._api.getCategoryList().subscribe(
      res => {
        this.categorydata = res.data.category;
      }
    )
  }

  public courseImage;
  onSelectFile(event) {
    this.fileFormatError = '';this.hasFile = false;
    this.selectedFile = event.target.files[0];
    if(this.selectedFile != undefined && this.selectedFile != null){
        let validFormat = ['png','jpeg','jpg'];
        let fileName = this.selectedFile.name.split('.').pop();
        let data = validFormat.find(ob => ob === fileName);
        if(data != null || data != undefined){
          var reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]); // read file as data url
          reader.onload = (event) => { // called once readAsDataURL is completed
            this.courseImage = event.target.result;this.hasFile = true;
          }
          return true;
        }
        this.fileFormatError = 'This File Format is not accepted';
    }
    return false;
  }

  updateCourse(formData){
    this.errorMsg = '';this.successMsg = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      const mainForm = new FormData();
      mainForm.append('formType','edit');
      Object.keys(formData.value).forEach((key)=>{
        mainForm.append(key,formData.value[key])
      });
      mainForm.append('teacherId',this.userInfo.teacherData.id);
      mainForm.append('courseId',this.course.id);
      if(this.hasFile){
        mainForm.append('image',this.selectedFile);
      }
      this._loader.startLoader('loader');
      this._api.createTeacherCourse(mainForm).subscribe(
        res => {
          if(res.error == false){
            Swal.fire('Success!', res.message, 'success');
          }else{
            Swal.fire('Error!', res.message);
          }
          this._loader.stopLoader('loader');
        },
        err => {
          this._loader.stopLoader('loader');
        },
      )
    }else{
      this.errorMsg = 'Plese fill all the form';
    }
  }

}
