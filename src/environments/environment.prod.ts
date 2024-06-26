export const environment = {
  production: true,
  apiUrl: 'http://scdocker.shipconsole.com:8765/ShipConsoleCloudAPI',
  authApiUrl: 'http://scdocker.shipconsole.com:9092/AuthServer',
  envName:process.env['ENV_NAME'] || 'stage',
  oauthUserName:'sc-admin',
  oauthPassword:'sc-admin',
  version: '1.18',
  localStorageEncryptionKey: '9ce7e387143d7ba7d7e017cfdb57b249',
  copyrights: ' 2024 ShipConsole. All rights reserved'
};
