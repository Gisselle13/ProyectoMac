import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


  import { AppModule } from './app/app-module';

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
//  if (window['ngRef']) {
//    window['ngRef'].destroy();
//  }
//  window['ngRef'] = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));
