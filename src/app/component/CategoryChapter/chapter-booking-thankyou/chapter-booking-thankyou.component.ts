import { Component, OnInit } from '@angular/core';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-chapter-booking-thankyou',
  template: `
  <ngx-ui-loader loaderId="loader" fgsColor="#FFFFFF" bgsOpacity="1" overlayColor="rgba(40,40,40,0.1)"></ngx-ui-loader>
  <section class="account-detail">
      <div class="d-flex">
          <ul class="aside">
              <app-sidebar></app-sidebar>
          </ul>
          <div class="account-sec mb-5">
              <h3>Payment Success</h3>
              <h3>Note : Please note the below Details for Future Referance</h3>
              <h4>Transaction Id : <a href="javascript:void(0)" class="value-rendered">{{data.stripe.transactionId}}</a></h4>
              <h4>Amount Received : <a href="javascript:void(0)" class="value-rendered">$ {{data.stripe.amount/100}}</a></h4>
              <h4>Booking Id : <a href="javascript:void(0)" class="value-rendered">{{data.purchase.id}}</a></h4>
              <br><hr>
              <h4>Chapter Details are as follow<hr>
                  <ul>
                    <li>Name : <a href="javascript:void(0)" class="value-rendered">{{data.chapter.chapter}}</a></li>
                    <li>Sub-Chapter : 
                      <ul>
                        <li *ngFor="let sub of data.chapter.sub_chapter">
                          <pre>
                            <span>{{sub.name}} </span>
                            <i class="ti-arrow-right mr-1"></i> {{sub.topics}}
                          </pre>
                        </li>
                      </ul>
                    </li>
                    <li>Price : <a href="javascript:void(0)" class="value-rendered">$ {{data.chapter.price}}</a></li>
                  </ul>
              </h4>
          </div>
      </div>
  </section>
  `,
  styles: [
  ]
})
export class ChapterBookingThankyouComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:APIService) {}

  public data : any = [];
  ngOnInit(): void {
    this.getdata();
  }

  getdata(){
    let allData = localStorage.getItem('chapterBookingData');
    this.data = JSON.parse(allData);
    console.log(this.data);
  }
}

