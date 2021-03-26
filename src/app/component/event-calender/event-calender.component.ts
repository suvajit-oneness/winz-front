import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import { getTimeFormat } from 'src/globalFunction';
import * as $ from 'jquery';

@Component({
  selector: 'app-event-calender',
  templateUrl: './event-calender.component.html',
  styleUrls: ['./event-calender.component.css']
})
// referance : https://therichpost.com/angular-10-fullcalendar-with-dynamic-events/

export class EventCalenderComponent implements OnInit {

    calendarOptions: CalendarOptions;

    public getTimeFormat = getTimeFormat;

    public AllEvents: {data: ALLEVENTSDATA[];};
    public events : {data : EVENTSTOSHOW[]};

    constructor(private http: HttpClient,private _loader : NgxUiLoaderService,private _api:APIService) {
      this.AllEvents = {data : []}; // Initialise blank data to ALlEVENTS interface
      this.events = {data : []}; // Initialise blank data to ALlEVENTS interface
    }

    public userInfo = this._api.getUserDetailsFromStorage();

    ngOnInit(){
      window.scrollTo(0, 0);
      this.getScheduleDate();
    }

    public getScheduleDate(){
      this._loader.startLoader('loader');
      let teacherId = this.userInfo.teacherData.id;
      this._api.getScheduleData(teacherId).subscribe(
        res => {
          if(res.error == false){
            res.data.forEach((response) => {
                // pushing into All EVentData Interface
                this.AllEvents.data.push({
                  id : response.id,teacherId : response.teacherId,
                  date : response.date,time : response.time,
                  available : response.available,
                });
            });
          }
          this.loadCalenderEvent();
          this._loader.stopLoader('loader');
        },err => {
          this._loader.stopLoader('loader');
        }
      )
    }

    public loadCalenderEvent(){
        this._loader.startLoader('loader');
        // pushing into EVENTStoSHOW Interface
        this.events.data = [];
        this.AllEvents.data.forEach((data) => {
          this.events.data.push({
            title : this.getTimeFormat(data.time),
            start : data.date,
          });
        });
        // load into Calender
        this.calendarOptions = {
          events : this.events.data,
          initialView : 'dayGridMonth',
          dateClick : this.handleDateClick.bind(this),
        };
        this._loader.stopLoader('loader');
    }

    public dateWiseEvents = [];public date = '';
    handleDateClick(arg) {
      this.dateWiseEvents = [];this.date = arg.dateStr;
      this.AllEvents.data.forEach((data) => {
        if(data.date == this.date){
          this.dateWiseEvents.push({
            time : this.getTimeFormat(data.time),
            available : data.available,
          });
        }
      });
      $('#launchModal').trigger('click');
    }
}

interface ALLEVENTSDATA{
  id : number,teacherId : number,
  date : string,time : string,
  available : number,
  
}

interface EVENTSTOSHOW{
  title : string,
  start : string,
}