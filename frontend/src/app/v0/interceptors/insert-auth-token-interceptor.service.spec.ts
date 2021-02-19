import {TestBed} from '@angular/core/testing';

import {InsertAuthTokenInterceptorService} from './insert-auth-token-interceptor.service';

describe('InsertAuthTokenInterceptorService', () => {
  let service: InsertAuthTokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertAuthTokenInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
