import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { MainViewComponent } from './components/views/main-view/main-view.component';
import { ProjectViewComponent } from './components/views/project-view/project-view.component';

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
    component: ProjectViewComponent
  }];
  
  @NgModule({
    declarations: [PlaceholderComponent],
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule { }
  