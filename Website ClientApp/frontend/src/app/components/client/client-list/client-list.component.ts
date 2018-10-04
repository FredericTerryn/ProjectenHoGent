import { Component, OnInit } from '@angular/core';
import { Client } from '../client/client.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ClientDataService } from '../../../dataservice/client-data.service';
import { Observable } from '../../../../../node_modules/rxjs/Observable';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

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


