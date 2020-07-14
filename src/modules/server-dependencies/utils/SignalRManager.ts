import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { from, ReplaySubject, Observable } from 'rxjs';
import { Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ObjectSchema } from 'yup';

export class SignalRManager<T> {
    public constructor(@Inject('environment') private environment: any, private cookieService: CookieService) { }

    private connection: HubConnection;
    feed: ReplaySubject<T> = new ReplaySubject<T>(1);

    initialize = (methodName: string, validation: ObjectSchema) => {
        const logMessages = this.environment.logMessages;

        if (logMessages === true) {
            console.log('Initializing SignalR connection', methodName);
        }

        if (this.cookieService.check('token')) {
            this.connection = new HubConnectionBuilder().withUrl(`${this.environment.baseUrl}/${methodName}?token=${this.cookieService.get('token')}`).build();
            this.connection.start();
    
            this.connection.on(methodName, item => {
                if (logMessages === true) {
                    console.log('SignalR messsage recieved', { methodName, item });
                }

                const validationAttempt = from(validation.isValid(item));
                validationAttempt.subscribe(isValid => {
                    if (isValid === true) {
                        this.feed.next(item);
                    } else if (logMessages === true) {
                        console.error('Error parsing message from SignalR hub', { item, validation });
                    }
                });
            });
        } else if (logMessages) {
            console.error('Tried to connect to SignalR hub without authentication.');
        }
    };

    quit = () => {
        if (this.connection !== undefined) {
            this.connection.stop();
            this.connection = undefined;
        }
    };
}