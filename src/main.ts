import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Plugins } from '@capacitor/core';

const { App } = Plugins;
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
  App['addListener']('backButton', () => {
    // Deja que el botón de retorno funcione según el comportamiento predeterminado
    window.history.back();
   
  });