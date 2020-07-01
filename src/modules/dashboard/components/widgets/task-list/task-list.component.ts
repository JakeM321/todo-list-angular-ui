import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { ProjectTask } from 'src/modules/server/Types';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent implements OnInit {

  @Input() tasks: Observable<ProjectTask[]>;
  @Input() canEdit: boolean = false;
  @Input() includeAssignee: boolean = false;
  @Output() edit: EventEmitter<string> = new EventEmitter<string>();
  @Output() markComplete: EventEmitter<string> = new EventEmitter<string>();

  showCompleted = new BehaviorSubject<boolean>(false);
  toggleShowCompleted = () => this.showCompleted.next(!this.showCompleted.value);

  transitioning = new BehaviorSubject<string>('');

  constructor() { }

  ngOnInit(): void {
  }

  getRowClass = (task: ProjectTask, transitioning: string, showCompleted: boolean) => {
    const classes = [
      ...task.completed ? ['is-selected'] : [],
      ...showCompleted === false && task.completed && transitioning !== task.id ? ['row-hidden'] : [],
      ...transitioning === task.id ? ['row-fade'] : ['full-opacity']
    ];

    return classes;
  }

  check = (task: ProjectTask) => {
    
    timer(400).subscribe(() => this.transitioning.next(''));
    this.markComplete.emit(task.id);
    if (!task.completed) {
      timer(20).subscribe(() => {
        this.transitioning.next(task.id);
      })
    }
  }

}
