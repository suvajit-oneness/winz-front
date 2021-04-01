import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';
import Swal from 'sweetalert2'
import * as $ from 'jquery';

@Component({
  selector: 'app-zoom-meeting',
  templateUrl: './zoom-meeting.component.html',
  styleUrls: ['./zoom-meeting.component.css']
})
export class ZoomMeetingComponent implements OnInit {

  public meeting: {data: ZOOMMEETING[];};

  public userInfo = this._api.getUserDetailsFromStorage(); // getting LoggedIn User information

  constructor(private _loader : NgxUiLoaderService,private _api:APIService) {
    this.meeting = {data : []}; // Initialise blank data to ZOOMMEETING interface
  }

  ngOnInit(): void {
    this.getZoomMeetingData();
  }

  // get Zoom meetings Data
  getZoomMeetingData(){
    this._loader.startLoader('loader');
    let request = '?userId='+this.userInfo.id+'&userType='+this.userInfo.userType;
    this._api.getZoomMeetingData(request).subscribe(
      res => {
        this.meeting.data = res.data;
        console.log('Zoom meeting Data Coming From Server',res);
        this._loader.stopLoader('loader');
      },err => {
        this._loader.stopLoader('loader');
      }
    )
  }

  // delete Zoom Meetings
  deleteZoomMeeting(zoomData){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Delete this Meeting!',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Proceed!',
    }).then((result) => {
      if (result.value) {
        this._loader.startLoader('loader');
        const mainForm = new FormData();
        mainForm.append('userId',zoomData.userId);
        mainForm.append('userType',zoomData.userType);
        mainForm.append('zoomMeetingId',zoomData.id);
        mainForm.append('meetingId',zoomData.meetingId);
        this._api.deleteZoomMeetings(mainForm).subscribe(
          res => {
            if(res.error == false){
              Swal.fire('Success', res.message);
              this.getZoomMeetingData(); // getting the Fresh list
            }else{
              Swal.fire('Error', res.message);
            }
            this._loader.stopLoader('loader');
          },
          err => {
            Swal.fire('Error', 'Something went wrong please try after sometime');
            this._loader.stopLoader('loader');
          },
        )
      } 
    });
  }


  // CreateNew Zoon Meetings
  public newZoom = {
    topic : '',agenda : '',startime : '',
  }

  public resetModal(){
    this.newZoom.topic = '';
    this.newZoom.agenda = '';
    this.newZoom.startime = '';
  }

  createNewZoomMeeting(createForm){
    if(createForm.valid){
      this._loader.startLoader('loader');
      const formData = new FormData();
      formData.append('userId',this.userInfo.id);
      formData.append('userType',this.userInfo.userType);
      formData.append('topic',this.newZoom.topic);
      formData.append('agenda',this.newZoom.agenda);
      formData.append('start_time',this.newZoom.startime);
      this._api.saveZoomMeetingData(formData).subscribe(
        res => {
          if(res.error == false){
            $('.closeModal').trigger('click');
            Swal.fire('Success', res.message);
            this.getZoomMeetingData();
          }else{
            Swal.fire('Error', res.message);
          }
          this._loader.stopLoader('loader');
        },
        err => {
          Swal.fire('Error', 'Something went wrong please try after sometime');
          this._loader.stopLoader('loader');
        }
      );
    }else{
      console.log('Form is Not valid Yet');
    }
  }

}

interface ZOOMMEETING{
  id : number,
  userId : number,
  userType : string,
  uuid : string,
  meetingId : number,
  host_id : string,
  host_email : string,
  topic : string,
  start_time : string,
  agenda : string,
  join_url : string,
  password : string,
  encrypted_password : string,
  status : string,
  type : string,
  start_url : string,
}