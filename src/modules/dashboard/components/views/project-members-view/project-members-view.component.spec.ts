import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMembersViewComponent } from './project-members-view.component';

describe('ProjectMembersViewComponent', () => {
  let component: ProjectMembersViewComponent;
  let fixture: ComponentFixture<ProjectMembersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectMembersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMembersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
