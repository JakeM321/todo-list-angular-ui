import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountUiComponent } from './account-ui.component';
import { By } from '@angular/platform-browser';
import { AccountService } from '../../services/AccountService';
import { MockLoginForm, MockRegisterForm, MockIcon, MockAccountService } from '../../TestingResources';

describe('AccountUiComponent', () => {
  let component: AccountUiComponent;
  let fixture: ComponentFixture<AccountUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountUiComponent, MockLoginForm, MockRegisterForm, MockIcon ],
      providers: [{
        provide: AccountService,
        useClass: MockAccountService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render login screen when applicable', () => {
    expect(fixture.debugElement.query(By.css('#loginui')).nativeElement.innerText).toEqual('LOGIN-UI');
  });

  it('should render register screen when applicable', () => {
    const service: MockAccountService = TestBed.get(AccountService);
    service.screen.next('register');
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#registerui')).nativeElement.innerText).toEqual('REGISTER-UI');
  });
});
