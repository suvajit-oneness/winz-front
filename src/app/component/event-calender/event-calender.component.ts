import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-event-calender',
  templateUrl: './event-calender.component.html',
  styleUrls: ['./event-calender.component.css']
})
// referance : https://therichpost.com/angular-10-fullcalendar-with-dynamic-events/

export class EventCalenderComponent implements OnInit {

    calendarOptions: CalendarOptions;

    constructor(private http: HttpClient,private _loader : NgxUiLoaderService) { }

    public events = [
      { title : 'Event1', start : '2021-03-18' },
      { title : 'Event2', start : '2021-03-19' },
      { title : 'Event 3', start : '2021-03-18' },
      { title : 'Event4', start : '2021-05-18' },
    ];

    ngOnInit(){
      this._loader.startLoader('loader');
      this.calendarOptions = {
        events : this.events,
        initialView : 'dayGridMonth',
        dateClick : this.handleDateClick.bind(this),
      };
      this._loader.stopLoader('loader');
    }

    public addEvent(){

    }

    public removeEvent(){

    }

    handleDateClick(arg) {
      console.log('Date Clicked',arg.dateStr);
    }
}

interface EVENTS{
  id : number,
  title : string,
  start : Date,
}