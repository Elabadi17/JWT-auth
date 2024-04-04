import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { HomeComponent } from './compenent/home/home.component';
import { LoginComponent } from './compenent/login/login.component';
import { RegistrationComponent } from './compenent/registration/registration.component';
import { DashboardComponent } from './compenent/dashboard/dashboard.component';
import { AuthGuard } from './services/auth/auth.guard';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

// Define routes for Home, About, and Contact components
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },


  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },

];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),HttpClientModule, provideHttpClient(withFetch())
  ]
};
