import { Component, OnInit } from '@angular/core';
import { Client } from '../client/client.model';
import { Subject } from '../../../../../node_modules/rxjs/Subject';
import { ClientDataService } from '../../../dataservice/client-data.service';
import { debounceTime, distinctUntilChanged, map } from '../../../../../node_modules/rxjs/operators';
import { HttpErrorResponse } from '../../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-allclients',
  templateUrl: './allclients.component.html',
  styleUrls: ['./allclients.component.css']
})
export class AllclientsComponent implements OnInit {

  public _clients: Client[];
  public _clientsFiltered: Client[];

  public _clientsFilteredByUsername: Client[];
  public errorMsg: string;
  filterClient$ = new Subject<string>();
  public filterClientName: string;
  constructor(private _clientdataservice: ClientDataService) {
    this.filterClient$
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        map(val => val.toLowerCase())
      )
      .subscribe(val => (this.filterClientName = val));


  }


  ngOnInit() { //data ophalen
    this._clientdataservice.clients.subscribe(
      data => { this._clients = data; 
      this._clientsFiltered = data;
      this._clientsFiltered = this._clientsFiltered.filter(c => c.username === localStorage.getItem('user'));

    },
   
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
          } while trying to retrieve clients: ${error.error}`;
      }
    );
  }

  get clients() {
    return this._clients;
  }
  get clientsCreatedbyCurrentUser() {
  return this._clientsFiltered;
  }
}