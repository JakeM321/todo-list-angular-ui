import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { ProjectService } from 'src/modules/dashboard/services/ProjectService';
import { map } from 'rxjs/operators';
import Color from 'color';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.less']
})
export class ProjectListComponent implements OnInit {

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
  }

  hoveredTile = -1;
  hoveredStar = -1;

  tiles = this.projectService.projects.pipe(
    map(projects => projects.map(project => ({
      ...project,
      colour: {
        primary: project.colour,
        alt: Color(project.colour).lighten(0.3)
      }
    })))
  );

  toggleFavourite = this.projectService.toggleFavourite;

}
