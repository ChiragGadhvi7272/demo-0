import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {
    this.loadLocalStorageUserData('user_data');
  }

  private key = environment.localStorageEncryptionKey;
  private _localUserData: any;

  saveData(key: string, value: string) {
    let encryptedData = CryptoJS.AES.encrypt(value, this.key).toString();
    localStorage.setItem(key, encryptedData);
  }

  loadLocalStorageUserData(key: string) {
    let data = localStorage.getItem(key);

    if (data) {
      this._localUserData = CryptoJS.AES.decrypt(data, this.key).toString(
        CryptoJS.enc.Utf8
      );
    }
  }
  getLocalUserData() {
    if (this._localUserData) {
      return JSON.parse(this._localUserData);
    } else {
      return null;
    }
  }
  clearLocalUserData() {
    this._localUserData = null;
  }
}
