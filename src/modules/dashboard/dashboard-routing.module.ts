import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';

@Component({
    template: '<p>Placeholder</p>'
}) class PlaceholderComponent {}

const routes: Routes = [{
    path: '',
    component: PlaceholderComponent
  }, {
    path: 'tasks',
    component: PlaceholderComponent
  }, {
    path: 'projects',
    component: PlaceholderComponent
  },{
    path: 'notifications',
    component: PlaceholderComponent
  }];
  
  @NgModule({
    declarations: [PlaceholderComponent],
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule { }
  