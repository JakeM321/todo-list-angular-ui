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
        var headers = req.headers;

        const exemptRoutes = [
            'email-login',
            'email-availability',
            'email-register'
        ];

        if (exemptRoutes.filter(route => req.url.includes(route)).length === 0) {
            const token = this.cookieService.get('token');
            headers.set('token', token);
        }

        const modifiedRequest = req.clone({
            url: `${this.environment.baseUrl}/${req.url}`,
            headers
        });

        return next.handle(modifiedRequest).pipe(
            catchError(e => {
                console.log('HTTP error', e);
                throw e;
            })
        );
    };

}