import { Component, OnInit, Input } from '@angular/core';
import { ActDataservice } from '../../providers/act-dataservice';

@Component({
  selector: 'argazki-banner',
  templateUrl: 'argazki-banner.html'
})
export class ArgazkiBannerComponent implements OnInit {

  @Input('datuak') datuak: any;
  
  image_url:string = null;
  data1:    string = null;
  data2:    string = null;
  data3:    string = null;
  data4:    string = null;

  constructor(public ds: ActDataservice) {
    console.log('Hello ArgazkiBanner Component.');
    if (this.ds.liga === this.ds.ligak[0].value) {
      this.image_url = "assets/images/liga/Burua/" + this.ds.liga + "/" + Math.floor(Math.random() * 35) + ".jpg";
    } else {
      this.image_url = "assets/images/liga/Burua/" + this.ds.liga + "/" + Math.floor(Math.random() * 17) + ".jpg";
    }    
    console.log('this.image_url: '+ this.image_url);
  }

  ngOnInit(){
    console.log('ngOnInit');
    if (this.datuak){
      console.log('this.datuak: '+ this.datuak );
      console.log(this.datuak);

      this.data1 = this.datuak.data1;
      this.data2 = this.datuak.data2;
      this.data3 = this.datuak.data3;
      this.data4 = this.datuak.data4;
    }
  } 

}
