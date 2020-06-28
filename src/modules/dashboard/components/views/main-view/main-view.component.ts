import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/modules/dashboard/services/ProjectService';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.less']
})
export class MainViewComponent implements OnInit {

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectService.loadPreviewList();
  }

}
