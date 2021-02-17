import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from '../../../@entities/IUser';
import {Subject} from 'rxjs';
import {AuthService} from '../../../servie/auth.service';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

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
