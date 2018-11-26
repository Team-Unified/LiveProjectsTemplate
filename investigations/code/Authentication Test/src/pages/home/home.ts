import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Facebook, Instagram, OauthCordova} from 'ionic-cordova-oauth';
//import { Facebook, Instagram, OauthBrowser} from 'ionic-cordova-oauth';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {  

  private oauth: OauthCordova = new OauthCordova();
  //private oauth: OauthBrowser = new OauthBrowser();

    //Instagram
    private instagramProvider: Instagram = new Instagram ({
      clientId: "1eee6d9118fc4221be7049d1c59c47c5",
      redirectUri: 'https://tinyurl.com/krmpchb',
      responseType: 'token'
    })
    
    //Facebook
    private facebookProvider: Facebook = new Facebook ({
      clientId: "",
      redirectUri: 'http://localhost/callback',
      appScope: ["email"],
      responseType: 'code'
    })
    constructor(private navCtrl: NavController, private platform: Platform) { }
    
    status: string = "";

    //Instagram
    insta() {
        this.platform.ready().then(() => {
            this.oauth.logInVia(this.instagramProvider).then(success => {  
            //alert('Token?: ' + JSON.stringify(success));
              this.status = "Success, you're now connected!" + "Token:" + JSON.stringify(success);
              console.log(success);
            }, error => {
                this.status = "ERROR " + error; 
            });
        });
    }

    //Facebook
    facebook() {
        this.platform.ready().then(() => {
            this.oauth.logInVia(this.facebookProvider).then(success => {  
              this.status = "Success, you're now connected!";
            //alert('RESULT: ' + JSON.stringify(success));
                console.log("SUCCESS: ", success);
            }, error => {
                console.log("ERROR: ", error);
            });
        });
    }








  
}
