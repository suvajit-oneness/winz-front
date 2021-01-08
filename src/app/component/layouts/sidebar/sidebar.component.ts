import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
      <li><a routerLink="/dashboard"><i class="ti-dashboard"></i> Dashboard</a></li>
      <li class="active"><a routerLink="/user/profile"><i class="ti-pencil-alt"></i> Edit Profile</a></li>
      <li><a routerLink="/user/password/change"><i class="ti-eraser"></i> Change Password</a></li>
      <li><a href="javascript:void(0)"><i class="ti-receipt"></i> Subscribed Courses</a></li>
      <li><a href="javascript:void(0)"><i class="ti-book"></i> Course Details</a></li>
      <li><a href="javascript:void(0)"><i class="ti-na"></i> Log Out</a></li>
  `,
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
