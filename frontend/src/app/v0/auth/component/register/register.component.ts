import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AuthService} from '../../service/auth.service';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {IUser} from '../../../@entities/IUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {

  user = {} as IUser;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  submit() {
    this.authService.addUser(this.user).pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.router.navigate(['/auth/login']);
      });
  }
}
