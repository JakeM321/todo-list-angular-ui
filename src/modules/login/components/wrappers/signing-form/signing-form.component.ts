import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-signing-form',
  templateUrl: './signing-form.component.html',
  styleUrls: ['./signing-form.component.less']
})
export class SigningFormComponent implements OnInit {

  constructor() { }

  @Input() header: string;

  ngOnInit(): void {
  }

}
