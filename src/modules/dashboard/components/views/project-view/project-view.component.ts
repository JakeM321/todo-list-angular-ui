import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/modules/dashboard/services/ProjectService';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.less']
})
export class ProjectViewComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectService.openProject(this.route.snapshot.paramMap.get('id'));
    this.route.paramMap.subscribe(newParams => this.projectService.openProject(newParams.get('id')));
  }

  selected = this.projectService.selected;

}
