// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // envName: 'dev',
  envName: process.env['ENV_NAME'] || 'dev',
  apiUrl: 'http://localhost:8765/ShipConsoleCloudAPI', 
  authApiUrl: 'http://localhost:9092/AuthServer',
  oauthUserName: 'sc-admin',
  oauthPassword: 'sc-admin',
  version: '1.18',
  localStorageEncryptionKey: '9ce7e387143d7ba7d7e017cfdb57b249',
  copyrights : ' 2024 ShipConsole. All rights reserved',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
