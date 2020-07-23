import { Injectable, Inject } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs/operators';
import _ from 'lodash';
import { IAuthenticationService } from 'src/modules/server/services/IAuthenticationService';
import { Router } from '@angular/router';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(
        @Inject('environment') private environment,
        private cookieService: CookieService,
        @Inject('IAuthenticationService') private authenticationService: IAuthenticationService,
        private router: Router
    ) {}

    intercept = (req: HttpRequest<any>, next: HttpHandler) => {
        const exemptRoutes = [
            'email-login',
            'email-availability',
            'email-register'
        ];

        const includeToken = exemptRoutes.filter(route => req.url.includes(route)).length === 0;
        const token = this.cookieService.get('token');

        var headers = req.headers;

        var chosenHeaders = includeToken ? headers.set('token', token) : headers;

        const modifiedRequest = req.clone({
            url: `${this.environment.baseUrl}/${req.url}`,
            headers: chosenHeaders
        });

        return next.handle(modifiedRequest).pipe(
            catchError(e => {
                console.log('HTTP error', e);

                if (_.get(e, 'status', 0) === 401) {
                    this.authenticationService.Logout();
                    this.router.navigate(['/logout']);
                }

                throw e;
            })
        );
    };

}