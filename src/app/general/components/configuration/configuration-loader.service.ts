import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from './configuration.model';
import { firstValueFrom, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationLoaderService {
  constructor(private _http: HttpClient) {}

  private readonly BASE_CONFIG_URL = './assets/config/';

  private _configurationSubject: BehaviorSubject<Configuration | null> =
    new BehaviorSubject<Configuration | null>(null);

  public configuration$: Observable<Configuration | null> =
    this._configurationSubject.asObservable();

  public loadConfiguration(erpType: string) {
    const configUrl = `${
      this.BASE_CONFIG_URL
    }${erpType.toLowerCase()}configuration.json`;
    return firstValueFrom(this._http.get(configUrl))
      .then((configuration: any) => {
        this._configurationSubject.next(configuration);
        console.log('set configuration', configuration);
        // return configuration;
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  getConfiguration() {
    return this.configuration$;
  }

  clearConfiguration() {
    this._configurationSubject.next(null);
  }
}
