import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ApiInterceptor } from './services/ApiInterceptor';
import { AuthenticationService } from './services/AuthenticationService';
import { TodoListApi } from '../server-dependencies-mock/services/TodoListApi';


@NgModule({
  declarations: [],
  providers: [
    CookieService, {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    }, {
      provide: 'IAuthenticationService',
      useClass: AuthenticationService
    }, {
      provide: 'ITodoListApi',
      useClass: TodoListApi
    }
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServerDependenciesModule { }
