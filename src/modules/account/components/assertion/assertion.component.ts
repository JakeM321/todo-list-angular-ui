import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _ from 'lodash';
import { IAuthenticationService } from 'src/modules/server/services/IAuthenticationService';
import { timer } from 'rxjs';

@Component({
  selector: 'app-assertion',
  templateUrl: './assertion.component.html',
  styleUrls: ['./assertion.component.less']
})
export class AssertionComponent implements OnInit {
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    @Inject('IAuthenticationService') private authenticationService: IAuthenticationService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (_.has(params, 'code')) {
        this.code = params['code'];

        const request = this.authenticationService.OAuth({token: this.code});
        request.subscribe(response => {
          this.valid = response.success;
          this.redirect(!response.success);
        })
      } else {
        this.valid = false;
        this.redirect();
      }
    });
  };

  redirect = (delay: boolean = true) => {
    timer(delay ? 1000 : 0).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  code: string = '';
  valid: boolean = true;

}
