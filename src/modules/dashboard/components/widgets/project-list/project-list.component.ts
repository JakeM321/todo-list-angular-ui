import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.less']
})
export class ProjectListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hoveredTile = -1;
  hoveredStar = -1;

  tiles = of([{
    id: '0',
    isTemplate: false,
    label: 'Project 1',
    colour: {
      primary: 'rgb(211, 13, 211)',
      alt: 'rgb(209, 59, 209)'
    },
    favourite: true
  }, {
    id: '1',
    isTemplate: false,
    label: 'Project 2',
    colour: {
      primary: 'rgb(7, 182, 123)',
      alt: 'rgb(91, 179, 149)'
    },
    favourite: false
  }, {
    id: 'new',
    isTemplate: true,
    label: 'New Project',
    colour: {
      primary: 'white',
      alt: 'white'
    },
    favourite: false
  }])

}
