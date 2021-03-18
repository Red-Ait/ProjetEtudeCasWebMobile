import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {catchError, finalize, map} from 'rxjs/operators';
import {AlertController} from '@ionic/angular';

@Injectable()
export class HTTPStatus {

  private request: BehaviorSubject<boolean>;

  constructor() {
    this.request = new BehaviorSubject(false);
  }

  setHttpStatus(inFlight: boolean) {
    this.request.next(inFlight);
  }

  getHttpStatus(): Observable<boolean> {
    return this.request.asObservable();
  }
}

@Injectable({
  providedIn: 'root'
})
export class HttpListenerService {

  constructor(
    private status: HTTPStatus,
    public alertController: AlertController
  ) { }

  async serverErrorAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Server Error',
      buttons: ['OK']
    });

    await alert.present();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.status.setHttpStatus(true);
    return next.handle(req).pipe(
      map(event => {
        return event;
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status >= 500) {
            this.serverErrorAlert();
          }
        }
        return throwError(error);
      }),
      finalize( () => {
        this.status.setHttpStatus(false);
      }));
  }
}
