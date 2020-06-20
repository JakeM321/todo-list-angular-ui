import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServerModule } from 'src/modules/server/server.module';
import { AccountModule } from 'src/modules/login/account.module';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    ServerModule
  ],
  providers: [{
    provide: 'environment',
    useValue: environment
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
