import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  token$ = new BehaviorSubject<string | null>(localStorage.getItem('token'));

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.token$.next(token);
  }

  getToken() {
    return this.token$.value;
  }
}