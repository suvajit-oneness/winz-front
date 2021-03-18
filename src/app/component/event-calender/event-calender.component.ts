import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

// referance : https://stackblitz.com/run?file=demo%2Ftemplate.html
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-event-calender',
  templateUrl: './event-calender.component.html',
  styleUrls: ['./event-calender.component.css']
})

export class EventCalenderComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal) {}

  public data = [
    {title : 'events1',start:'Fri Mar 05 2021 00:00:00 GMT+0530 (India Standard Time)',end:'Fri Mar 05 2021 00:00:00 GMT+0530 (India Standard Time)'},
    {title : 'events2',start:'Fri Mar 04 2021 00:00:00 GMT+0530 (India Standard Time)',end:'Fri Mar 04 2021 00:00:00 GMT+0530 (India Standard Time)'},
    {title : 'events3',start:'Fri Mar 03 2021 00:00:00 GMT+0530 (India Standard Time)',end:'Fri Mar 03 2021 00:00:00 GMT+0530 (India Standard Time)'},
    {title : 'events4',start:'Fri Mar 05 2021 00:00:00 GMT+0530 (India Standard Time)',end:'Fri Mar 05 2021 00:00:00 GMT+0530 (India Standard Time)'},
    {title : 'events5',start:'Fri Mar 04 2021 00:00:00 GMT+0530 (India Standard Time)',end:'Fri Mar 04 2021 00:00:00 GMT+0530 (India Standard Time)'},
    {title : 'events6',start:'Fri Mar 03 2021 00:00:00 GMT+0530 (India Standard Time)',end:'Fri Mar 03 2021 00:00:00 GMT+0530 (India Standard Time)'},
  ];

  ngOnInit(): void {
    Object.keys(this.data).forEach((key)=>{
      this.addEvent(key);
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }
  
  addEvent(key): void {
    this.events = [
      ...this.events,
      {
        title: key.title,
        start: key.start,
        end: key.end,
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
    console.log(this.events);
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
