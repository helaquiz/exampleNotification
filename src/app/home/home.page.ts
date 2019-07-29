import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';


// ทำการ Declare ตัวแปร FirebasePlugin เพื่อให้ Project เรารู้จักตัวแปรจาก Plugin cordova-plugin-firebase-lib
declare var FirebasePlugin: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  token: string = ''

  constructor(
    private alertCtrl: AlertController
  ) { }

  onRegisterDevice() {
    // Function Callback เมื่อเรียก getToken() สำเร็จ 
    // จะได้ Token มาซึ่งไว้ใช้ติดต่อกันระหว่าง Server กับตัว Client
    const successGetTokenCallback = (accessToken: string) => {
      this.token = accessToken;
      console.log(`Register Success ::: The token is ${accessToken}`);
    }

    // Function Callback เมื่อเรียก getToken() ไม่สำเร็จ 
    // จะบอกสาเหตุว่า เพราะอะไรจึงไม่สามารถ getToken() ได้
    const errorGetTokenCallback = (error: any) => {
      console.error(`Error getting token ${error}`);
    }

    // Function getToken() คือ Function ที่ทำหน้าในการ Register Device กับ Firebase Server
    // เหมือนกับการ Register Device เข้าไปที่ Firebase Console
    FirebasePlugin.getToken(successGetTokenCallback, errorGetTokenCallback);

    const notificationHandler = async (notification: any) => {
      const alert = await this.alertCtrl.create({
        header: "Alert !",
        message: JSON.stringify(notification, null, 2)
      });
      // เมื่อ User กด Notification จาก Notification Bar (Background)
      if (notification.tap) {
        alert.subHeader = `User opened a notification on "Background"`;
      } else { // เมื่อ User เปิด Application อยู่แล้ว (Foregound)
        alert.subHeader = `User opened a notification on "Foreground"`;
      }
      await alert.present();
    }
    // Function onNotificationOpen() 
    // คือ Function ที่ทำหน้าที่ในการ Handle Notification ที่ได้รับเข้ามา
    FirebasePlugin.onNotificationOpen(notificationHandler);
  }
}
