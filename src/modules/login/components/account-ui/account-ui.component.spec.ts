import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountUiComponent } from './account-ui.component';

describe('AccountUiComponent', () => {
  let component: AccountUiComponent;
  let fixture: ComponentFixture<AccountUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountUiComponent ]
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
});
