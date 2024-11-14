import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/login/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { DashboardTopBarComponent } from './components/dashboard/dashboard-top-bar/dashboard-top-bar.component';
import { RoleManagementComponent } from './components/admin/role-management/role-management.component';
import { ArtCurrentStatusComponent } from './components/art-current-status/art-current-status.component';
import { ArtInitiationDemographicsComponent } from './components/charts/art-initiation-demographics/art-initiation-demographics.component';
import { ArtInitiationDemographicsFacilityComponent } from './components/charts/art-initiation-demographics-facility/art-initiation-demographics-facility.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    DashboardTopBarComponent,
    RoleManagementComponent,
    ArtCurrentStatusComponent,
    ArtInitiationDemographicsComponent,
    ArtInitiationDemographicsFacilityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
