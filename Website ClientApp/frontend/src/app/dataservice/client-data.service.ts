import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Client } from '../components/client/client/client.model';

@Injectable()
export class ClientDataService {
  private readonly _appUrl = '/API';

  constructor(private http: HttpClient) { }

  get clients(): Observable<Client[]> {
    return this.http
      .get(`${this._appUrl}/clients/`)
      .pipe(map((list: any[]): Client[] => list.map(Client.fromJSON)));
  }

  addNewClient(client: Client): Observable<Client> {
    return this.http
      .post(`${this._appUrl}/clients/`, client)
      .pipe(map(Client.fromJSON));
  }

  deleteClient(rec: Client): Observable<Client> {
    return this.http
      .delete(`${this._appUrl}/clients/${rec.id}`)
      .pipe(map(Client.fromJSON));
  }

  getClient(id: string) {
    const theUrl = `${this._appUrl}/clients/${id}`;
    return this.http.get(theUrl).pipe(map(Client.fromJSON));
  }

  checkEmailAvailability(email: string): Observable<boolean> {
      return this.http.post(`${this._appUrl}/checkemail`, { email }).pipe(
        map((item: any) => {
          if (item.email === 'alreadyexists') {
            return false;
          } else {
            return true;
          }
        })
      );
    }
  
  
  
  }


