import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServerModule } from 'src/modules/server/server.module';
import { LoginModule } from 'src/modules/login/login.module';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    ServerModule
  ],
  providers: [{
    provide: 'environment',
    useValue: environment
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
