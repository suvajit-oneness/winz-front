import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  public schedule: {data: SCHEDULE[];};

  public errorMsg = '';public successMsg = '';

  public userInfo = this._api.getUserDetailsFromStorage();

  constructor(private _loader : NgxUiLoaderService,private _api:APIService,private toast:ToastrService) {
    this.schedule = {data : []}; // Initialise blank data to SCHEDULE interface
  }

  ngOnInit(): void {
    this.getScheduleDate();
  }

  public getScheduleDate(){
    this._loader.startLoader('loader');
    let teacherId = this.userInfo.id;
    this._api.getScheduleData(teacherId).subscribe(
      res => {
        if(res.error == false){
          res.data.forEach((response) => {
              this.schedule.data.push({
                date : response.date,time : response.time,
                mon : (response.mon == 1) ? true : false,
                tue : (response.tue == 1) ? true : false,
                wed : (response.wed == 1) ? true : false,
                thu : (response.thu == 1) ? true : false,
                fri : (response.fri == 1) ? true : false,
                sat : (response.sat == 1) ? true : false,
                sun : (response.sun == 1) ? true : false,
              });
          });
        }
        if(this.schedule.data.length == 0){ // if Not Found any Data
          this.addSchedule();
        }
        this._loader.stopLoader('loader');
      },err => {
        this.errorMsg = 'Something went wrong please try after some time';
        this._loader.stopLoader('loader');
      }
    )
  }

  // public scheduleData = [];
  public addSchedule(){
    this.schedule.data.push({
      date : '',time : '',
      mon : true,tue : true,wed : true,thu : true,
      fri : true,sat : true,sun : true,
    });
  }

  public removeSchedule(row){
    const index = this.schedule.data.indexOf(row);
    this.schedule.data.splice(index, 1);
  }

  public updateScheduledData() {
    let dateData = '';let timeDate = '';let request = true;this.errorMsg = '';this.successMsg = '';
    let monday = '';let tuesday = '';let wednesday = ''; let thurusday = '';let friday = '';let saturday = '';let sunday = '';
    this.schedule.data.forEach((teacherData) => {
      if(teacherData.date == '' || teacherData.time == ''){
        this.errorMsg = 'please fill all the data correctly';
        request = false;
      }else{
        dateData += teacherData.date+'@rajeev@';timeDate += teacherData.time+'@rajeev@';
        monday += teacherData.mon+'@rajeev@';tuesday += teacherData.tue+'@rajeev@';
        wednesday += teacherData.wed+'@rajeev@';thurusday += teacherData.thu+'@rajeev@';
        friday += teacherData.fri+'@rajeev@';saturday += teacherData.sat+'@rajeev@';
        sunday += teacherData.sun+'@rajeev@';
        // request = false;
      }
    });

    console.log('Monday',monday);
    console.log('Tuesday',tuesday);
    console.log('Wednesday',wednesday);




    if(request == true){
      // console.log('Form are Now Ready to POST');
      this._loader.startLoader('loader');
      let teacherId = this.userInfo.id;
      const mainForm = new FormData();
      mainForm.append('date',dateData);mainForm.append('time',timeDate);
      mainForm.append('monday',monday);mainForm.append('tuesday',tuesday);
      mainForm.append('wednesday',wednesday);mainForm.append('thurusday',thurusday);
      mainForm.append('friday',friday);mainForm.append('saturday',saturday);
      mainForm.append('sunday',sunday);
      // mainForm.append('event',eventData);
      this._api.saveScheduleUserData(teacherId,mainForm).subscribe(
        res => {
          if(res.error == false){
            this.successMsg = res.message;
          }
          else{
            this.errorMsg = res.message;
          }
          this._loader.stopLoader('loader');
        },err => {
          this._loader.stopLoader('loader');
          this.errorMsg = 'Something went wrong please try after some time';
        }
      )
    }
  }
}

interface SCHEDULE{
  date : string,time : string,
  mon : boolean,tue : boolean,wed : boolean,thu : boolean,
  fri : boolean,sat : boolean,sun : boolean
}
