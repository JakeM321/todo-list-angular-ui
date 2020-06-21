import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'lodash';

@Component({
  selector: 'app-assertion',
  templateUrl: './assertion.component.html',
  styleUrls: ['./assertion.component.less']
})
export class AssertionComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (_.has(params, 'code')) {
        this.code = params['code'];
      } else {
        this.valid = false;
      }
    })
  }

  code: string = '';
  valid: boolean = true;

}
