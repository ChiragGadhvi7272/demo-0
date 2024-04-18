import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ConfigurationLoaderService } from './configuration-loader.service';

export function loadConfiguration(configService: ConfigurationLoaderService) {
  const dataValues = localStorage.getItem('user_data');
  const convertedUserData = JSON.parse(dataValues || '{}');
  const erpType = convertedUserData.erpType || 'shipconsole';
  return configService.loadConfiguration(erpType);
}

@NgModule({
  imports: [HttpClientModule],
  declarations: [],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfiguration,
      deps: [ConfigurationLoaderService],
      multi: true,
    },
  ],
})
export class ConfigurationModule {}
