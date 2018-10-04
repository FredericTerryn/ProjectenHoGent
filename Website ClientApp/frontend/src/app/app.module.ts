import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ClientListComponent } from './components/client/client-list/client-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { ClientComponent } from './components/client/client/client.component';
import { ClientFilterPipe } from './components/client/pipe/client-filter.pipe';
import { AuthGuardService } from './user/auth-guard.service';
import { RegisterComponent } from './user/register/register.component';
import { AuthenticationService } from './user/authentication.service';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { ClientAddComponent } from './components/client/client-add/client-add.component';
import { ContactComponent } from './components/contact/contact.component';
import { AllclientsComponent } from './components/client/allclients/allclients.component';
import { basehttpInterceptorProviders } from './http-interceptors';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'clients',
    canActivate: [AuthGuardService],
    component: ClientListComponent
  },
  {
    path: 'allclients',
    canActivate: [AuthGuardService],
    component: AllclientsComponent
  },
  {
    path: 'addclient',
    canActivate: [AuthGuardService],
    component: ClientAddComponent
  },
  {path: 'contact', component: ContactComponent, pathMatch: 'full'},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavbarComponent,
    ClientListComponent,
    ClientFilterPipe,
    FooterComponent,
    ClientComponent,
    ClientAddComponent,
    ContactComponent,
    AllclientsComponent,
  RegisterComponent,
  LoginComponent,
  LogoutComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)],
  providers: [AuthenticationService, AuthGuardService, basehttpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
