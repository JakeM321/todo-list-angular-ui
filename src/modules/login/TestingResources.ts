import { Injectable, Component, Input } from "@angular/core";
import { BehaviorSubject, of, Observable } from "rxjs";

@Injectable()
export class MockAccountService {
    screen = new BehaviorSubject<string>('login');

    Login = () => {};
    Register = () => {};
    OAuthLogin = () => {};
    OAuthRegister = () => {};
    VerifyAvailability = () => of(false);
    Logout = () => {};

    loginError =  of(false);
    loading =  of(false);
    emailValid =  of(false);
    validatingEmail =  of(false);

    validateEmail = () => of(false);
};

@Component({
  selector: 'app-login-form',
  template: '<div id="loginui">LOGIN-UI</div>'
}) export class MockLoginForm {
  @Input() loading: any;
}

@Component({
  selector: 'app-register-form',
  template: '<div id="registerui">REGISTER-UI</div>'
}) export class MockRegisterForm {}

@Component({
  selector: 'fa-icon',
  template: '<div></div>'
}) export class MockIcon {
  @Input() icon: any;
}

@Component({
    selector: 'app-form-field',
    template: '<div></div>'
  }) export class MockFormField {
    @Input() type: string = 'text';
    @Input() label: string;
    @Input() controlName: string;
    @Input() hasLeftIcon: boolean = false;
    @Input() icon: any = [];

    @Input() errorMessages: { [key: string]: string } = {};
    public errorKeys: string[] = [];
    public hasErrors: Observable<boolean>;

    @Input() hasLiveValidation: boolean = false;
    @Input() isValidating: Observable<boolean> = of(false);
    @Input() liveValidationSucceeded: Observable<boolean> = of(false);
}