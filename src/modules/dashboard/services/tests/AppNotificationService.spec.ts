import { async, TestBed } from '@angular/core/testing';
import { AppNotificationService } from '../AppNotificationService';
import { IAuthenticationService } from 'src/modules/server/services/IAuthenticationService';
import { Observable, of, Subject } from 'rxjs';
import { AuthStatus, WebsocketMessage, Notification } from 'src/modules/server/Types';
import { ITodoListApi } from 'src/modules/server/services/ITodoListApi';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';

@Injectable()
class AuthService implements IAuthenticationService {
    Status: Observable<AuthStatus>;
    Login = payload => of({ success: true });
    Register = payload => of({ success: true, accountAlreadyInUse: false })
    OAuth = payload => of({ success: true });
    VerifyAvailability = payload => of(true);
    Logout = () => {};

    websocket = new Subject<WebsocketMessage>();
};

const initialNotification = {
  id: 'abcd1234',
  header: '',
  body: '',
  isLink: true,
  link: '',
  seen: false
};

const newNotification = { ...initialNotification, id: 'efgh5678' };

@Injectable()
class Api implements ITodoListApi {
    loadNotifications = (): Observable<Notification[]> => of([ initialNotification ]);

    markNotificationsAsSeen = (ids: string[]) => of(true);

};

describe('AppNotificationService', () => {

  let service: AppNotificationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{
          provide: 'environment',
          useValue: {}
        }, {
          provide: 'IAuthenticationService',
          useClass: AuthService
        }, {
          provide: 'ITodoListApi',
          useClass: Api
        },
        AppNotificationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(AppNotificationService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should load initial notifications', done => {
    service.initialize().subscribe(() => {
      expect(service.state.value.notifications).toEqual([ initialNotification ]);
      done();
    });
  });

  it('should relay notifications from the web socket', done => {
    const authService: AuthService = TestBed.get('IAuthenticationService');
    
    service.initialize().subscribe(() => {
      authService.websocket.next({ header: 'notification', body: JSON.stringify(newNotification) });

      service.notifications.subscribe(notifications => {
        expect(notifications).toContain(newNotification);
        done();
      });
    })
    
  });
});
