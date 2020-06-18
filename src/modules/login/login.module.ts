import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginUiComponent } from './components/login-ui/login-ui.component';
import { LoginService } from './services/LoginService';

import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { SigningFormComponent } from './components/wrappers/signing-form/signing-form.component';

@NgModule({
  declarations: [LoginUiComponent, LoginFormComponent, RegisterFormComponent, SigningFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [LoginService],
  exports: [LoginUiComponent]
})
export class LoginModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faGoogle);
    library.addIcons(faEnvelope);
    library.addIcons(faLock);
  }
}
