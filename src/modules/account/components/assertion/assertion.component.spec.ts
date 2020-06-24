import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssertionComponent } from './assertion.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { MockAuthenticationService } from '../../TestingResources';
import { BehaviorSubject, of } from 'rxjs';

describe('AssertionComponent', () => {
  let component: AssertionComponent;
  let fixture: ComponentFixture<AssertionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ AssertionComponent ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          params: of('')
        }
      }, {
        provide: 'IAuthenticationService',
        useClass: MockAuthenticationService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
