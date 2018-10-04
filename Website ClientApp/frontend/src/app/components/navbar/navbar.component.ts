import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
public pathinString:String;

  constructor(private authService: AuthenticationService) {
   }

  ngOnInit() {}
  get currentUser(): Observable<string> {
    return this.authService.user$;
  }
}
