import { Component, OnInit, Input } from '@angular/core';
import { Client } from './client.model';
import { HttpErrorResponse, HttpClient, HttpResponse } from '../../../../../node_modules/@angular/common/http';
import { ClientDataService } from '../../../dataservice/client-data.service';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Observable } from '../../../../../node_modules/rxjs/Observable';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})

export class ClientComponent implements OnInit {
  public errorMsg: string;
  public loggedInUser: string = localStorage.getItem('user');
  public _clients:Client[];

  @Input() client: Client;

  constructor( private _clientdataservice: ClientDataService, private router: Router) { 
    this.loggedInUser = localStorage.getItem('user');
  }

  ngOnInit() {
    this._clientdataservice.clients.subscribe(
      data => { this._clients = data;},
      (error: HttpErrorResponse) => {
        this.errorMsg = 'Cant load clients.';
      }
    );
  }

  deleteClient(client) {
    if (confirm("Delete " + client.name + "?")) {
      this._clientdataservice.deleteClient(client).subscribe();
      this._clients = this._clients.filter(c => client.id !== c.id);
     location.reload();
    }
  }
   
 
    // if (confirm("Delete " + client.name + "?")) {
    //   this._clientdataservice.deleteClient(client).subscribe(
    //     data =>{
    //       console.log("data client: " + data.name);
    //       console.log("client van methode : " + client.name);
    //       console.log("volledige lijst : " + this._clients.forEach(element => {
    //         element.name;
    //       }));
    //       this._clients = this._clients.filter(c => c.name!== client.name);
    //       console.log("volledige lijst na delete!è! : " + this._clients.forEach(element => {
    //         element.name;
    //       }));
    //     },(error: HttpErrorResponse) => {
    //       this.errorMsg = `Error ${error.status} while removing client for ${
    //         client.name
    //       }: ${error.error}`;
    //     }
    //   );
    // }
  


    get clients() {
      return this._clients;
    }
}



