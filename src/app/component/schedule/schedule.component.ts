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
    let userId = this.userInfo.id;
    this._api.getScheduleData(userId).subscribe(
      res => {
        if(res.error == false){
          res.data.forEach((response) => {
              this.schedule.data.push({
                date : response.date,
                time : response.time,
                event : response.event,
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
      date : '',
      time : '',
      event : '',
    });
  }

  public removeSchedule(row){
    const index = this.schedule.data.indexOf(row);
    this.schedule.data.splice(index, 1);
  }

  public updateScheduledData() {
    let dateData = '';let timeDate = '';let eventData = '';let request = true;this.errorMsg = '';this.successMsg = '';
    this.schedule.data.forEach((formDate) => {
      if(formDate.date == '' || formDate.time == '' || formDate.event == ''){
        this.errorMsg = 'please fill all the data correctly';
        request = false;
      }else{
        dateData += formDate.date+'@rajeev@';
        timeDate += formDate.time+'@rajeev@';
        eventData += formDate.event+'@rajeev@';
      }
    });
    if(request == true){
      console.log('Form are Now Ready to POST');
      this._loader.startLoader('loader');
      let userId = this.userInfo.id;
      const mainForm = new FormData();
      mainForm.append('date',dateData);
      mainForm.append('time',timeDate);
      mainForm.append('event',eventData);
      this._api.saveScheduleUserData(userId,mainForm).subscribe(
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
  date : string,
  time : string,
  event: string, 
}
