import { ITodoListApi } from 'src/modules/server/services/ITodoListApi';
import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Notification } from 'src/modules/server/Types';

@Injectable()
export class TodoListApi implements ITodoListApi {
    loadNotifications = (): Observable<Notification[]> => of([{
        id: '1',
        header: 'You\'re using mock mode!',
        body: 'Mock mode replaces all server dependencies with injected test data, so you can roam around and test the UI without a back-end.',
        isLink: true,
        link: 'github.com/JakeM123',
        seen: false
    }, {
        id: '2',
        header: 'Injecting websocket messages',
        body: 'Did you know that while running this UI in mock mode, you can push notifications to the UI by mocking websocket messages? Open the developer console to find out more!',
        isLink: false,
        link: '',
        seen: false
    }]);

    markNotificationsAsSeen = (ids: string[]) => of(true);
};