import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  public schedule: {data: SCHEDULE[];};
  public errorMsg = '';

  constructor(private _loader : NgxUiLoaderService,private _api:APIService) {
    this.schedule = {data : []}; // Initialise blank data to SCHEDULE interface
  }

  ngOnInit(): void {
    this.getScheduleDate();
  }

  public getScheduleDate(){
    // this._loader.startLoader('loader');
    // let userId = 0;
    // this._api.getScheduleData(userId).subscribe(
    //   res => {
    //     this._loader.stopLoader('loader');
    //   },err => {this.errorMsg = 'Something went wrong please try after some time'}
    // )
    this.scheduleData.forEach((value) => {
        this.schedule.data.push({
          date : value.date,
          time : value.time,
          event : value.event,
        });
    });
  }

  public scheduleData = [
    {date:'2021-03-19',time:'10:00',event:'math'},
    {date:'2021-03-19',time:'11:00',event:'physics'},
    {date:'2021-03-19',time:'12:00',event:'chemistry'},
    // {id: 4,date:'2021-03-20',time:'10:00',event:'math'},
    // {id: 5,date:'2021-03-20',time:'11:00',event:'physics'},
    // {id: 6,date:'2021-03-20',time:'12:00',event:'chemistry'},
    // {id: 7,date:'2021-03-21',time:'10:00',event:'math'},
    // {id: 8,date:'2021-03-21',time:'11:00',event:'physics'},
    // {id: 9,date:'2021-03-21',time:'12:00',event:'chemistry'},
    // {id: 10,date:'2021-03-22',time:'10:00',event:'math'},
    // {id: 11,date:'2021-03-22',time:'11:00',event:'physics'},
    // {id: 12,date:'2021-03-22',time:'12:00',event:'chemistry'},
  ];

  public addSchedule(){
    console.log('Yeah! its Working for adding Schedule');
    this.schedule.data.push({
      date : '',
      time : '',
      event : '',
    });
  }

  public removeSchedule(row){
    console.log('Yeah! its Working for Removing Schedule');
    const index = this.schedule.data.indexOf(row);
    this.schedule.data.splice(index, 1);
  }

  public updateScheduledData() {
    
  }
}

interface SCHEDULE{
  date : string,
  time : string,
  event: string, 
}
