import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServerModule } from 'src/modules/server/server.module';
import { AccountModule } from 'src/modules/account/account.module';
import { environment } from 'src/environments/environment';
import { DashboardModule } from 'src/modules/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    ServerModule,
    DashboardModule
  ],
  providers: [{
    provide: 'environment',
    useValue: environment
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
