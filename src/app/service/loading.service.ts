import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading = new BehaviorSubject<boolean>(false);
  private requestCount = 0;

  public loading$ = this.loading.asObservable();

  show() {
    this.requestCount++;
    this.loading.next(true);
  }

  hide() {
    this.requestCount--;
    if (this.requestCount === 0) {
      this.loading.next(false);
    }
  }
}
