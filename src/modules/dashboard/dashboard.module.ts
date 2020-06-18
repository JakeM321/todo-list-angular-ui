import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardUiComponent } from './dashboard-ui/dashboard-ui.component';



@NgModule({
  declarations: [DashboardUiComponent],
  imports: [
    CommonModule
  ],
  exports: [ DashboardUiComponent ]
})
export class DashboardModule { }
