import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable, BehaviorSubject, timer, of } from 'rxjs';
import { ProjectTask, ProjectTaskIdentity } from 'src/modules/server/Types';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent implements OnInit {

  @Input() tasks: Observable<ProjectTask[]>;
  @Input() canEdit: boolean = false;
  @Input() includeAssignee: boolean = false;
  @Input() disableCompleted: boolean = false;
  @Output() edit: EventEmitter<string> = new EventEmitter<string>();
  @Output() markComplete: EventEmitter<ProjectTaskIdentity> = new EventEmitter<ProjectTaskIdentity>();

  showCompleted = new BehaviorSubject<boolean>(false);
  toggleShowCompleted = () => this.showCompleted.next(!this.showCompleted.value);

  transitioning = new BehaviorSubject<string>('');

  constructor() { }

  ngOnInit(): void {
    this.nonCompletedCount = this.tasks.pipe(map(tasks => tasks.filter(task => !task.completed).length));
  }

  nonCompletedCount: Observable<number> = of(0);

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
    this.markComplete.emit(task);
    if (!task.completed) {
      timer(20).subscribe(() => {
        this.transitioning.next(task.id);
      })
    }
  }

}
