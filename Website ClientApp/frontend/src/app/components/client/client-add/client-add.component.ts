import { Component, OnInit } from '@angular/core';
import { ClientDataService } from '../../../dataservice/client-data.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Client } from '../client/client.model';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../user/authentication.service';
import { Observable } from '../../../../../node_modules/rxjs/Observable';
import { controlNameBinding } from '../../../../../node_modules/@angular/forms/src/directives/reactive_directives/form_control_name';
import { map } from '../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})

export class ClientAddComponent implements OnInit {
  public client: FormGroup;
  public errorMsg: string;
  // people: String[] = ['M', 'V'];
  public readonly unitTypes = ['Male', 'Female'];

  constructor(
    private fb: FormBuilder,
    private _clientdataservice: ClientDataService,
    private router: Router,
    private authService: AuthenticationService,
  ) { }


  ngOnInit() {


    this.client = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required,
      Validators.minLength(4),
//      Validators.pattern('[a-zA-Z0-9]{0,}.[a-zA-Z0-9]{0,}@[a-zA-Z0-9]{1,}.[a-zA-Z0-9]{2,10}')
      Validators.email],
      this.checkemailvalidation()
    ],
      streetname: ['', [Validators.required, Validators.minLength(2)]],
      streetnumber: ['', [Validators.required, Validators.minLength(1)]],
      phone: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(15),
        Validators.pattern('[0-9]{1,15}|[+][0-9]{1,15}'),
      ]],
      gender: ['', [Validators.required,
      Validators.pattern('Male|Female')
      ]],
      birth: ['', [Validators.required,
      Validators.minLength(1),
      Validators.pattern('19\\d\\d-\\d\\d-\\d\\d|20\\d\\d-\\d\\d-\\d\\d'),
      ]]
    });
  }

  onSubmit() {
    const newclient = new Client(
      this.client.value.name,
      this.client.value.email,
      this.client.value.streetname,
      this.client.value.streetnumber,
      this.client.value.phone,
      this.client.value.gender,
      this.client.value.birth,
      localStorage.getItem('user'),

    );
    this._clientdataservice.addNewClient(newclient).subscribe(
      () => { },
      (error: HttpErrorResponse) => {
        console.log("error line 51");
        this.errorMsg = `Error ${error.status} while adding client for ${
          newclient.name
          }: ${error.error}`;
      }
    );
    setTimeout((router: Router) => {
      this.router.navigate(['clients']);
    }, 0);
  }

  checkemailvalidation(): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return this._clientdataservice
        .checkEmailAvailability(control.value)
        .pipe(
          map(available => {
            if (available) {
              return null;
            }
            return { emailAlreadyExists: true };
          })
        );
    };
  }

  
}





