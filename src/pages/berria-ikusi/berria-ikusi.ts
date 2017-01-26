import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';
import { ActDataservice } from '../../providers/act-dataservice';

@Component({
  selector: 'page-berria-ikusi',
  templateUrl: 'berria-ikusi.html'
})
export class BerriaIkusiPage {

  berria: any;
  url: string;
  bideoa_dago: boolean = false;
  subtitle: string = null;
  
  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    public ds: ActDataservice,
    private viewCtrl: ViewController,
    private sanitizer: DomSanitizer
  ) {
    this.url = navParams.get('url');
    this.berria = navParams.get('berria');
    this.subtitle = ds.getLigaUrtea();
    console.log('url constructor: '+ this.url);

    if (this.berria.bid != "" && this.berria.bid != "http://www.youtube.com/") {
        //$("#frmBerriaBideoa")[0].src = item.bid;
        //$("#player")[0].src = item.bid.replace("http:", "https:") + "?enablejsapi=1&origin=http://localhost:49948"; //http://www.ligasanmiguelapp.com //
        //$("#player")[0].src = item.bid + "?enablejsapi=1&origin=http://www.ligasanmiguelapp.com"; // //http://localhost:49948
        console.log('Lehen: '+ this.berria.bid);
        this.berria.bid = this.berria.bid.replace("www.youtube.com", "www.youtube-nocookie.com") + "?enablejsapi=1&origin=http://localhost:8100"; // //   //http://www.ligasanmiguelapp.com
        console.log('Gero: '+ this.berria.bid);
        this.bideoa_dago = true;
    }

    this.berria.bid = sanitizer.bypassSecurityTrustResourceUrl(this.berria.bid);
    console.log('Azkenean: '+ this.berria.bid);
    this.viewCtrl = viewCtrl;
  }

  ionViewDidLoad() {
    console.log('Hello BerriaIkusi Page');
    console.log('url: '+ this.url);
    console.log(this.berria);
  }
}
