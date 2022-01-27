import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
    console.log('Local Storage - Constructor');
  }

  set(key: string, value: any): boolean {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  get(key: string): any {
    if (this.storage) {
      let value = this.storage.getItem(key);

      if (value == null) {
        return '';
      }

      return JSON.parse(value);
    }
    return null;
  }

  getNumber(key: string): number {
    if (this.storage) {
      let value = this.storage.getItem(key);

      if (value == null) {
        return 0;
      }

      return parseInt(JSON.parse(value));
    }

    return 0;
  }

  increment(key: string): boolean {
    const newValue = this.getNumber(key) + 1;

    return this.set(key, newValue);
  }

  decrement(key: string): boolean {
    const newValue = this.getNumber(key) - 1;

    if (newValue < 0) {
      this.set(key, 0);
    }

    return this.set(key, newValue);
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }
}
