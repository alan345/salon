import './polyfills.ts';
import 'hammerjs';



import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {environment} from './environments/environment';
import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModuleFactory(AppModuleNgFactory);
// platformBrowserDynamic().bootstrapModule(AppModule);
  // .then((success: any) => console.log('App bootstrapped'))
  // .catch((err: any) => console.error(err));
