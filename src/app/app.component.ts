import { Component, /* NgZone */} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PushService } from './push.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private pushService: PushService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initPushNotification();
    });
  }

  initPushNotification() {
    if (!this.platform.is('ios')) {
      console.warn('Push notifications not initialized.  Run in physical device');
      return;
    }

    this.pushService.setAutoClearBadge(true);
    this.pushService.setUrlProvider((data) => {
      if (data.additionalData && data.additionalData.page) {
        return ['tabs', data.additionalData.page];
      }
      return ['tabs', 'tab1'];
    });
    
    this.pushService.activate();
  }
}
