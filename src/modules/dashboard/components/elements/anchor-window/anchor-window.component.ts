import { Component, OnInit, Input, HostListener, Output, EventEmitter, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import _ from 'lodash';

@Component({
  selector: 'app-anchor-window',
  templateUrl: './anchor-window.component.html',
  styleUrls: ['./anchor-window.component.less']
})
export class AnchorWindowComponent implements OnInit {
  @ViewChild('content') content: ElementRef;

  constructor(
    private renderer: Renderer2
    ) { }

  ngOnInit(): void {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (_.has(this.content, 'nativeElement')) {
        if (!this.content.nativeElement.contains(e.target) && !this.control.nativeElement.contains(e.target)) {
          this.close.emit('');
        }
      }
    });
  }

  @Input() isOpen: Observable<boolean>;
  @Input() control: ElementRef;
  @Input() position: any = {};
  @Output() close = new EventEmitter();

}
