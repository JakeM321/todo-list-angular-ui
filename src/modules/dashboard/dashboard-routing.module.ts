import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { MainViewComponent } from './components/views/main-view/main-view.component';
import { ProjectViewComponent } from './components/views/project-view/project-view.component';
import { ProjectTaskViewComponent } from './components/views/project-task-view/project-task-view.component';
import { ProjectMembersViewComponent } from './components/views/project-members-view/project-members-view.component';
import { ProjectActivityViewComponent } from './components/views/project-activity-view/project-activity-view.component';

@Component({
    template: '<p>Placeholder</p>'
}) class PlaceholderComponent {}

const routes: Routes = [{
    path: '',
    component: MainViewComponent
  }, {
    path: 'tasks',
    component: PlaceholderComponent
  }, {
    path: 'projects',
    component: PlaceholderComponent
  },{
    path: 'notifications',
    component: PlaceholderComponent
  }, {
    path: 'project/:id',
    component: ProjectViewComponent,
    children: [{
      path: '',
      pathMatch: 'full',
      redirectTo: 'tasks'
    }, {
      path: 'tasks',
      component: ProjectTaskViewComponent
    }, {
      path: 'members',
      component: ProjectMembersViewComponent
    }, {
      path: 'activity',
      component: ProjectActivityViewComponent
    }]
  }];
  
  @NgModule({
    declarations: [PlaceholderComponent],
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule { }
  