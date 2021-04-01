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

  public bookedSlot : any = [];
  public getScheduleDate(){
    this._loader.startLoader('loader');
    let teacherId = this.userInfo.teacherData.id;
    this._api.getScheduleData(teacherId).subscribe(
      res => {
        if(res.error == false){
          res.data.forEach((response) => {
            if(response.available != 2){
              this.schedule.data.push({
                date : response.date,time : response.time,
                available : (response.available == 1) ? true : false,
              });
            }else{
              this.bookedSlot.push({
                date : response.date,time : response.time,
                available : 2
              });
            }
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
      date : '',time : '',available : true
    });
  }

  public removeSchedule(row){
    const index = this.schedule.data.indexOf(row);
    this.schedule.data.splice(index, 1);
  }

  public updateScheduledData() {
    let dateData = '';let timeDate = '';let request = true;this.errorMsg = '';this.successMsg = '';
    let available = '';
    this.schedule.data.forEach((teacherData) => {
      if(teacherData.date == '' || teacherData.time == ''){
        this.errorMsg = 'please fill all the data correctly';
        request = false;
      }else{
        dateData += teacherData.date+'@rajeev@';timeDate += teacherData.time+'@rajeev@';
        available += teacherData.available+'@rajeev@';
      }
    });

    if(request == true){
      // console.log('Form are Now Ready to POST');
      this._loader.startLoader('loader');
      let teacherId = this.userInfo.teacherData.id;
      const mainForm = new FormData();
      mainForm.append('date',dateData);mainForm.append('time',timeDate);
      mainForm.append('available',available);
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
  date : string,time : string,available : boolean
}
