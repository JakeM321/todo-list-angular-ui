import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectActivityViewComponent } from './project-activity-view.component';

describe('ProjectActivityViewComponent', () => {
  let component: ProjectActivityViewComponent;
  let fixture: ComponentFixture<ProjectActivityViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectActivityViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectActivityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
