import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginUiComponent } from './components/login-ui/login-ui.component';



@NgModule({
  declarations: [LoginUiComponent],
  imports: [
    CommonModule
  ],
  bootstrap: [LoginUiComponent]
})
export class LoginModule { }
