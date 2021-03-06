import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from './services/AccountService';

import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock, faCheck, faUserCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { FormFieldComponent } from './components/elements/form-field/form-field.component';
import { AccountUiComponent } from './components/account-ui/account-ui.component';
import { AssertionComponent } from './components/assertion/assertion.component';
import { SplashScreenWrapperComponent } from './components/elements/splash-screen-wrapper/splash-screen-wrapper.component';

@NgModule({
  declarations: [AccountUiComponent, LoginFormComponent, RegisterFormComponent, FormFieldComponent, AccountUiComponent, AssertionComponent, SplashScreenWrapperComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [AccountService],
  exports: [AccountUiComponent]
})
export class AccountModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faGoogle, faEnvelope, faLock, faCheck, faUserCircle, faSpinner);
  }
}
