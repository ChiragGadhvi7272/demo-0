import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) { }

  loadConfig(envName: string) {
    // const envName =  process.env['ENV_NAME'] || 'qa';
    // console.log(envName);
    return this.http.get<any>(`/assets/config.${envName}.json`).toPromise().then(
      res => {
        this.config = res;
        console.log(res);
        Object.assign(environment, this.config);
      }
    );
  }

  getConfig() {
    return this.config;
  }
}
