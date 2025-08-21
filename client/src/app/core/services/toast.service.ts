import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }
  private toastSubject = new Subject<any>();
  toastState = this.toastSubject.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.toastSubject.next({ message, type });
  }
}
