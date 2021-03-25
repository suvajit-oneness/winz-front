import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import { EncodeDecodeBase64 } from 'src/globalFunction';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {
  public EncodeDecodeBase64 = EncodeDecodeBase64;
  constructor(private _loader : NgxUiLoaderService,private _activatedRoute:ActivatedRoute,private _api:APIService) { }

  public teacherId : any = 0;public teacherData : any = {};
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.teacherId = EncodeDecodeBase64(this._activatedRoute.snapshot.paramMap.get('teacherId'),'decode');
    this.getTeacherDetailsAndTheirCourses(this.teacherId); // calling to get the Teacher Info
    this.getTeacherAllAvailableSlots(this.teacherId); // getting The Available Slots for Teacher
  }

  getTeacherDetailsAndTheirCourses(teacherId){
    this._loader.startLoader('loader');
    this._api.getTeacherDetails(teacherId).subscribe(
      res => {
        this.teacherData = res.data;
        this._loader.stopLoader('loader');
      },err => {}
    )
  }

  public slotsData = [];
  getTeacherAllAvailableSlots(teacherId){
    this._loader.startLoader('loader');
    this._api.getTeacherAvailableSlots(teacherId).subscribe(
      res => {
        if(res.error == false){
          this.slotsData = res.data;
        }
        console.log('SlotData',this.slotsData);
        this._loader.stopLoader('loader');
      },err => {this._loader.stopLoader('loader');}
    )
  }

  public bookSlot(slotDetails){
    console.log('Slot Details',slotDetails);
  }
}
