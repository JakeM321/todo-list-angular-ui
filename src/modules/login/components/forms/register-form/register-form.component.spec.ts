import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import { AccountService } from 'src/modules/login/services/AccountService';
import { MockAccountService, MockFormField } from 'src/modules/login/TestingResources';
import { of, timer } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { format } from 'path';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterFormComponent, MockFormField ],
      providers: [{
        provide: AccountService,
        useClass: MockAccountService
      }],
      imports: [ ReactiveFormsModule, FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect taken email', done => {
    fixture.detectChanges();

    component.ngOnInit();
    component.form.setValue({'email': 'j.smith@test.com', 'displayName': 'John', 'password': 'pass', 'confirmPassword': 'pass'});

    component.form.statusChanges.pipe(take(1)).subscribe(() => {
      expect(component.form.controls['email'].errors.emailInUse).toBeTrue();
      done();
    });
  });

  it('should identify available email', done => {
    const service: MockAccountService = TestBed.get(AccountService);
    service.validateEmail = () => of(true);
    fixture.detectChanges();

    component.ngOnInit();
    component.form.setValue({'email': 'j.smith@test.com', 'displayName': 'John', 'password': 'pass', 'confirmPassword': 'pass'});

    component.form.statusChanges.pipe(take(1)).subscribe(() => {
      expect(component.form.controls['email'].errors).not.toEqual(jasmine.objectContaining({'emailInUse': true }));
      done();
    });
  });

  it('should detect mismatching passwords', done => {
    component.ngOnInit();
    component.form.setValue({'email': 'j.smith@test.com', 'displayName': 'John', 'password': 'pass', 'confirmPassword': 'different'});

    component.form.statusChanges.pipe(take(1)).subscribe(() => {
      expect(component.form.errors.password['mustMatch']).toBeTrue();
      expect(component.form.errors.confirmPassword['mustMatch']).toBeTrue();
      done();
    });
  });

  it('should allow matching passwords', done => {
    component.ngOnInit();
    component.form.setValue({'email': 'j.smith@test.com', 'displayName': 'John', 'password': 'pass', 'confirmPassword': 'pass'});

    component.form.statusChanges.pipe(take(1)).subscribe(() => {
      expect(component.form.errors).not.toEqual(jasmine.objectContaining({'password': { mustMatch: true } }))
      expect(component.form.errors).not.toEqual(jasmine.objectContaining({'password': { mustMatch: true } }))
      done();
    });
  });
});
