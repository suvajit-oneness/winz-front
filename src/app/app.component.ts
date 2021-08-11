import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ConnectionService } from 'ng-connection-service';
import { ToastrService } from 'ngx-toastr';
import { APIService } from './service/api.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'winz-frontend';
  public showHeaderFooter: boolean = false;
  public isConnected : boolean = true;
  public whatsappNumber : any = environment.whatsappNumber;

  constructor(private _api:APIService,private _router:Router,private _connection:ConnectionService,public toastr:ToastrService){
    _router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login' || event['url'] == '/signup') {
          this.showHeaderFooter = false;
        } else {
          this.showHeaderFooter = true;
        }
      }
    });
    
    // Internet Checking
    this._connection.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if(this.isConnected){
        this.toastr.success('Success','You are Online');
      }else{
        this.toastr.error('Error','You are Offline');
      }
    });
    // Internet Checking END
  }
}
