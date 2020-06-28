import { Component, OnInit } from '@angular/core';
import { DashboardUiService } from 'src/modules/dashboard/services/DashboardUiService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-new-project-modal',
  templateUrl: './new-project-modal.component.html',
  styleUrls: ['./new-project-modal.component.less']
})
export class NewProjectModalComponent implements OnInit {

  constructor(
    private dashboardUiService: DashboardUiService
  ) { }

  ngOnInit(): void {
    this.dashboardUiService.newProjectMenuOpen.subscribe(open => console.log('menuOpen', open));
  }

  menuOpen = this.dashboardUiService.newProjectMenuOpen;
  close = this.dashboardUiService.toggleNewProjectMenu;

  form = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  onSubmit = () => {}

  colour = new BehaviorSubject<string>('#fff000');
  updateColour = (event: ColorEvent) => this.colour.next(event.color.hex);

  loading = of(false);

}
