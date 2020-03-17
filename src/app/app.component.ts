import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

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
    private push: Push,
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
    const options: PushOptions = {
      android: {
        senderID: 'SomeSenderID',
        forceShow: 'true'
      },
      ios: {
        alert: 'true',
        badge: 'true',
        sound: 'true',
      },
      windows: {}
    }
    const pushObject: PushObject = this.push.init(options);
    this.preparePushNotification(pushObject);
    this.push.hasPermission().then( perm => {
      console.log(`PushNotification permission: ${perm.isEnabled}`);
      if (perm.isEnabled) {
        console.log('Have Push permission');
      } else {
        console.log('Not have Push permission');
      }
    });
  }

  preparePushNotification(pushObject: PushObject) {
    pushObject.on('registration').subscribe((data: any) => {
      console.log('device token -> ' + data.registrationId);
      console.log('registratio type -> ' + data.registrationType);
      // TODO - send device token to server
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message -> ' + data.message);
      // if user using app and push notification comes
      if (data.additionalData.foreground) {
        console.log('Received in foreground');
      } else if (data.additionalData.coldstart) {
        console.log('Push notification clicked');
        console.log('ADD NAVIGATION HERE');
      } else {
        console.log('App returned from background');
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
  }
}
