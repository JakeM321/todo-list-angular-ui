import { Component, OnInit } from '@angular/core';
import { DashboardUiService } from 'src/modules/dashboard/services/DashboardUiService';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { ProjectTask } from 'src/modules/server/Types';

@Component({
  selector: 'app-project-task-view',
  templateUrl: './project-task-view.component.html',
  styleUrls: ['./project-task-view.component.less']
})
export class ProjectTaskViewComponent implements OnInit {

  constructor(
    private dashboardUiService: DashboardUiService
  ) { }

  ngOnInit(): void {
    this.dashboardUiService.setProjectUiTab('tasks');
  }

  tasks = new BehaviorSubject<ProjectTask[]>([{
    id: '1',
    projectId: '1',
    assignedTo: { email: 'j.smith@gmail.com', displayName: 'John' },
    label: 'Task 1',
    description: 'First task',
    completed: false
  }, {
    id: '2',
    projectId: '1',
    assignedTo: { email: 'j.smith@gmail.com', displayName: 'John' },
    label: 'Task 2',
    description: 'Second task',
    completed: false
  }, {
    id: '3',
    projectId: '1',
    assignedTo: { email: 'a.smith@gmail.com', displayName: 'Andrew' },
    label: 'Task 3',
    description: 'Third task',
    completed: false
  },  {
    id: '4',
    projectId: '1',
    assignedTo: { email: 'b.smith@gmail.com', displayName: 'Bill' },
    label: 'Task 4',
    description: 'Another task',
    completed: true
  }]);

  markComplete = (id: string) => this.tasks.next([ 
    ...this.tasks.value.filter(t => t.id !== id), 
    { 
      ...this.tasks.value.find(t => t.id === id),
      completed: !this.tasks.value.find(t => t.id === id).completed
    }
  ].sort((a, b) => a.id < b.id ? -1 : 1));

  edit = () => {};

}
