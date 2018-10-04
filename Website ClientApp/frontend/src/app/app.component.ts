import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from './user/authentication.service';
import { ClientDataService } from './dataservice/client-data.service';
// import { KlantDataService } from './klant/klant-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
   providers: [ClientDataService]
})

export class AppComponent {
  constructor(private _clientdataservice: ClientDataService, private router: Router, private authService: AuthenticationService){}

}
