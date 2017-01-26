import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-argazkia-ikusi',
  templateUrl: 'argazkia-ikusi.html'
})
export class ArgazkiaIkusiPage {

  url: any = null;
  photos: any = null;
  mySlideOptions = {
    initialSlide: 1,
    loop: true
  };

  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController
  ) {
    this.url = navParams.get('url');
    this.photos = navParams.get('photos');
    this.mySlideOptions.initialSlide = navParams.get('index');
    this.viewCtrl = viewCtrl;
  }

  ionViewDidLoad() {
    console.log('Hello ArgazkiaIkusi Page');
  }

  itxi(){
    console.log('close');
    this.viewCtrl.dismiss();
  }
}
