import { Injectable, Inject } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(
        @Inject('environment') private environment,
        private cookieService: CookieService
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
                throw e;
            })
        );
    };

}