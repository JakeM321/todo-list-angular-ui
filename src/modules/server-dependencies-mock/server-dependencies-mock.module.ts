import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './services/AuthenticationService';
import { TodoListApi } from './services/TodoListApi';



@NgModule({
  declarations: [],
  providers: [{
    provide: 'IAuthenticationService',
    useClass: AuthenticationService
  }, {
    provide: 'ITodoListApi',
    useClass: TodoListApi
  }],
  imports: [
    CommonModule
  ]
})
export class ServerDependenciesMockModule { }
