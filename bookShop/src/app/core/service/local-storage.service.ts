import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  constructor(private localStorage: Storage) {}

  setItem(key: string, value: string | { [key: string]: any }) {
    this.localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T {
    return JSON.parse(this.localStorage.getItem(key));
  }

  removeItem(key: string) {
    this.localStorage.removeItem(key);
  }
}
