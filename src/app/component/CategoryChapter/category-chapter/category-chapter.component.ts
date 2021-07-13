import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-chapter',
  templateUrl: './category-chapter.component.html',
  styleUrls: ['./category-chapter.component.css']
})
export class CategoryChapterComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService) {}

  public teacherInfo : any = {};
  ngOnInit(): void {
    this.teacherInfo = this._api.getUserDetailsFromStorage();
    this.getChapterList(this.teacherInfo.id);
  }

  public chapter = [];
  getChapterList(teacherId){
    this._loader.startLoader('loader');
    this._api.getChapterListWithCategoryandSubjectCategory(teacherId).subscribe(
        res => {
          this.chapter = res.data;
          this._loader.stopLoader('loader');
        },err => {
          this._loader.stopLoader('loader');
        }
    );
  }

  deleteChapter(chapterData:any){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        const formField = new FormData();
        formField.append('teacherId',this.teacherInfo.id);
        formField.append('chapterId',chapterData.id);
        this._api.deleteChapter(formField).subscribe(
          res => {
            if(res.error == false){
              Swal.fire('Deleted!','Your imaginary file has been deleted.','success');
              this.getChapterList(this.teacherInfo.id);
            }else{
              Swal.fire('Cancelled',res.message,'error');
            }
          },err => {
            Swal.fire('Error','Something went wrong please try after some time','error');
          }
        )
      }
      // else if (result.dismiss === Swal.DismissReason.cancel) {
          // Swal.fire('Deleted!','Your imaginary file has been deleted.','success');
      // }
    });
  }

}
