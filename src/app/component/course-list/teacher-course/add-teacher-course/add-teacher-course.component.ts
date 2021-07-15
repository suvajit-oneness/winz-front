import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-teacher-course',
  templateUrl: './add-teacher-course.component.html',
  styleUrls: ['./add-teacher-course.component.css']
})
export class AddTeacherCourseComponent implements OnInit {

  constructor(private _api:APIService,private _loader : NgxUiLoaderService) {}

  public userInfo : any = {};
  public successMsg = '';public errorMsg = '';public fileFormatError = '';
  public selectedFile : File;public hasFile : boolean;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.userInfo = this._api.getUserDetailsFromStorage();
    // this.getCategory();
    this.hasFile = false;
  }

  // public categorydata = [];
  // getCategory(){
  //   this.categorydata = [];
  //   this._api.getCategoryList().subscribe(
  //     res => {
  //       this.categorydata = res.data.category;
  //     }
  //   )
  // }

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

  createNewCourse(formData){
    this.errorMsg = '';this.successMsg = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      const mainForm = new FormData();
      mainForm.append('formType','add');
      Object.keys(formData.value).forEach((key)=>{
        mainForm.append(key,formData.value[key])
      });
      mainForm.append('teacherId',this.userInfo.teacherData.id);
      if(this.hasFile){
        mainForm.append('image',this.selectedFile);
      }
      this._loader.startLoader('loader');
      this._api.createTeacherCourse(mainForm).subscribe(
        res => {
          if(res.error == false){
            Swal.fire('Success!', res.message, 'success');
            formData.form.reset();
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
