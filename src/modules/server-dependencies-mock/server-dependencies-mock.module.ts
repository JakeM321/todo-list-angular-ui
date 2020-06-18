import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './services/AuthenticationService';



@NgModule({
  declarations: [],
  providers: [{
    provide: 'IAuthenticationService',
    useClass: AuthenticationService
  }],
  imports: [
    CommonModule
  ]
})
export class ServerDependenciesMockModule { }
