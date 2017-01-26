import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate'
import { ActDataservice } from '../../providers/act-dataservice';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-zuzenean',
  templateUrl: 'zuzenean.html'
})
export class ZuzeneanPage {

  subtitle:       string   = null;
  banner_datuak:  any      = null;
  oEstropada:     any      = {
                              liga: '', /*/ "LSM";*/
                              data: '',
                              ordua:  '',
                              luzea:  '', /*/ luzea, "Z", "H" edo "FINALIZADA"*/
                              batkalea:  '', /*/ I--> Izquierda, D-->Derecha*/
                              traineruak: []
                            };
  bEstropadaMartxanLehen: boolean = false;
  bEstropadaMartxan:      boolean = false;
  nWidthKalea:            number = 1;
  nHeightKalea:           number = 10;
  nIDTimerZuzenean:       number = null;
  nIDTimerKaleak:         number = null;
  batKaleaNon:            string = "I";
  aKaleKoloreak:          string[] = ["rgba(255, 255, 255, 0.5)", "rgba(255, 0, 0, 0.4)", "rgba(0, 200, 0, 0.4)", "rgba(255, 255, 0, 0.5)", "rgba(0, 0, 0, 0.4)", "rgba(186, 0, 255, 0.4)"];
  aKaleZenbakiak:         string[] = ["1", "2", "3", "4", "5", "6"];
  aKaleZenbakiakClone:    any[] = [];
  nClipTop:               number = 0;
  nClipBottom:            number = 1000;

  constructor(
    public navCtrl: NavController,
    public ds: ActDataservice,
    private alertCtrl: AlertController,
    private translateService: TranslateService,
    private sanitizer: DomSanitizer
    ) {
      this.subtitle = ds.getLigaUrtea();
      //Estropada bilatu. OJO, play-off egunetan, bat baina gehiago daudela.
      this.banner_datuak = {
          data1: 'aaaaaaaaaaaa', //this.ds.entityToHtml(this.estropada.iz),
          data2: 'bbbbbbbbbbb', //this.ds.entityToHtml(this.estropada.le),
          data3: 'cccccccccccccccc', //this.ds.entityToHtml(this.estropada.da),
          data4: 'dddddddddddddd', //this.ds.entityToHtml(this.taldea.ta).toString().toUpperCase()
      };
    }

  ionViewDidLoad() {
    console.log('Hello ZuzeneanPage Page');

    this.getZuzenean();

  }

  getZuzenean(){
    this.ds.getZuzenekoDatuak().subscribe(
        data => {
          console.log('getZuzenekoDatuak barruan');
          console.log(data);
          console.log(data._body);
          
          /* ********************************************* */
          //1º Jasotako datuekin "oEstropada" objetua sortu
          /* ********************************************* */
          let datuak : string[] = data._body.toString().split("\r\n");
          console.log(datuak);

          // let parts =this.oEstropada.data.split('/');
          // let mydate = new Date(parts[2],parts[1]-1,parts[0]); //please put attention to the month
          // console.log(mydate);          this.oEstropada.liga = datuak[0]; /*/ "LSM";*/
          this.oEstropada.data = datuak[1];
          this.oEstropada.ordua = datuak[2];
          //this.oEstropada.luzea = datuak[3]; /*/ luzea, "Z", "H" edo "FINALIZADA"*/
          this.translateService.get('Luzea').subscribe((luzea: string) => {
              console.log(luzea);
              if (datuak[3] == "FINALIZADA"){
                this.translateService.get('Amaituta').subscribe((Amaituta: string) => {
                  console.log(Amaituta);
                  this.oEstropada.luzea = Amaituta;
                });
              }else{
                this.oEstropada.luzea = datuak[3] +' '+ luzea;
              }
          });
          this.oEstropada.batkalea = datuak[4]; /*/ I--> Izquierda, D-->Derecha*/
          console.log(this.oEstropada);
          
          this.bEstropadaMartxanLehen = this.bEstropadaMartxan;
          this.bEstropadaMartxan = (this.oEstropada.luzea == "FINALIZADA") ? false : true;
          this.bEstropadaMartxan = (this.oEstropada.luzea.indexOf("FINAL") == -1) ? true : false;

          /*/alert(bEstropadaMartxan);*/
          let aTraineruak = [];
          if (this.bEstropadaMartxan && datuak[5] != "") { /*/ziabogan zehar, ez dago traineruen daturik.*/
              for (var i = 5; i < datuak.length; i++) {
                  if (datuak[i] == "") continue;
                  var aTraiDatuak = datuak[i].split("\t");
                  let trainerua = { 
                    "ordena":       aTraineruak.length+1,
                    "izena":        aTraiDatuak[0], 
                    "distHelmuga":  aTraiDatuak[1], 
                    "kaleaX":       parseFloat(aTraiDatuak[2]), 
                    "kaleaY":       parseFloat(aTraiDatuak[3]),
                    "label":        ''
                  };

                  if (i == 5){
                    trainerua.label = aTraiDatuak[0] + "  " + aTraiDatuak[1] + "m";
                  } else {
                    let sDiff = aTraiDatuak[1];
                    let nSeg: number = parseInt(aTraiDatuak[1], 10);
                    if (nSeg > 59) {
                        let nMin: number = nSeg / 60;
                        nSeg = nSeg % 60;
                        sDiff = nMin + "\'" + ((nSeg < 10) ? "0" : "") + nSeg;
                    }
                    trainerua.label = aTraiDatuak[0] + "  " + sDiff + "\"";
                 }   

                aTraineruak[aTraineruak.length] = trainerua;
              }
          }

          if (!this.bEstropadaMartxanLehen && this.bEstropadaMartxan) {
              //this.kaleakMugitu();
          }

          this.oEstropada.traineruak = aTraineruak;
          console.log(this.oEstropada);
          
          /* ********************************************* */
          //2º daturik badago, kaleak erakutsi
          /* ********************************************* */
          this.kaleakErakutsi();

          /* ********************************************* */
          //3º daturik badago, traineruak erakutsi
          /* ********************************************* */


        }, 
        error => {
          console.error('Akats bat gertatu da: '+ error);

          this.translateService.get('DaturikEz').subscribe((res: string) => {
              console.log(res);
              let alert = this.alertCtrl.create({
                title: 'ERROR',
                subTitle: res,
                buttons: ['OK']
              });
              alert.present();
          });
        }
      );
  }

  kaleakErakutsi() {
    try {
      let nKaleak = this.oEstropada.traineruak.length;
      this.nWidthKalea = (window.innerWidth * 0.96) / (nKaleak + 4);
      this.nHeightKalea = (window.innerHeight - 250) / 7;
      let zuzeneanHeight = window.innerHeight - 250;
      console.log('kaleakErakutsi: this.nWidthKalea: '+ this.nWidthKalea);
      console.log('kaleakErakutsi: this.nHeightKalea: '+ this.nHeightKalea);

      let aKaleKoloreakClone = this.aKaleKoloreak.slice(0, nKaleak);
      let aKaleZenbakiakAux  = this.aKaleZenbakiak.slice(0, nKaleak);
      if (this.oEstropada.batkalea == "D") {
          aKaleKoloreakClone.reverse();
          aKaleZenbakiakAux.reverse();
      }

      for (let i=0; i<aKaleKoloreakClone.length; i++){
        this.aKaleZenbakiakClone[i] = {
            "zenbakia":  aKaleZenbakiakAux[i],
            "top":       0,
            "left":      this.nWidthKalea * (i + 2),
            "width":     this.nWidthKalea
        };
      }
      console.log(aKaleKoloreakClone);
       
      for (let i = 0; i < nKaleak; i++){
        this.oEstropada.traineruak[i].kaleaHeight  = zuzeneanHeight - 95;
        this.oEstropada.traineruak[i].kaleaLeft    = this.nWidthKalea * (i + 2);
        this.oEstropada.traineruak[i].kaleaBgcolor = aKaleKoloreakClone[i];
        this.oEstropada.traineruak[i].imgSrc       = '../assets/images/Zuzenean/imgTrain'+ this.oEstropada.traineruak[i]["izena"] +'.png';
        this.oEstropada.traineruak[i].imgLeft      = (this.oEstropada.traineruak[i]["kaleaX"] + 1) * this.nWidthKalea - 10; /*/-10 irudiaren zabaleraren erdia.*/
        this.oEstropada.traineruak[i].imgTop       = (this.oEstropada.traineruak[i]["kaleaY"] + 2) * this.nHeightKalea - 20;    /*/-20 irudiaren luzeraren erdia.*/
        this.oEstropada.traineruak[i].kaleaClip    = this.sanitizer.bypassSecurityTrustStyle('rect('+ this.nClipTop + 'px, '+ this.nWidthKalea + 'px, '+ this.nClipBottom + 'px, 0px)');
//[style.clip]="'rect('+ nClipTop + 'px, 1px, '+ nClipBottom + 'px, 0px)'"

        if (i < nKaleak){
          this.oEstropada.traineruak[i].kaleaWidth = this.nWidthKalea;
        }
        if (i == nKaleak-1){
          console.log('sartzen da');
          
          this.oEstropada.traineruak[this.oEstropada.traineruak.length] = { 
                    "ordena":       this.oEstropada.traineruak.length+1,
                    "izena":        '',
                    "distHelmuga":  '',
                    "kaleaX":       0, 
                    "kaleaY":       0,
                    "heightKalea":  zuzeneanHeight - 95,
                    "leftKalea":    this.nWidthKalea * (i + 3),
                    "widthKalea":   this.nWidthKalea,
                    "bgcolor":      aKaleKoloreakClone[i+1],
                    "label":        '',
                    "imgSrc":       '',
                    "imgLeft":      '',
                    "imgTop":       '',
                    "kaleaClip":    ''
                  };
          console.log(this.oEstropada);
          
        }
      }


    } catch (e) {
        this.translateService.get('DaturikEz').subscribe((res: string) => {
              console.log(res);
              let alert = this.alertCtrl.create({
                title: 'ERROR1',
                subTitle: res,
                buttons: ['OK']
              });
              alert.present();
          });
    }
  } 

  nItxasoa: number = 2;
  kaleakMugitu() {
    try {
        if (this.bEstropadaMartxan) {
            //var nTop = 0;
            
            // $(".kalea").css("top", (nTop + (this.nItxasoa * 2)) + "px");
            // $(".kalea").css("clip", "rect(" + (30 - (this.nItxasoa * 2)) + "px, " + this.nWidthKalea + "px, " + ($("#divZuzenean").height() - 10 - (this.nItxasoa * 2)) + "px, 0px)");

            // this.nItxasoa++;
            // if (this.nItxasoa > 15) {
            //     this.nItxasoa = 1;
            // }
            // clearTimeout(nIDTimerKaleak);
            // nIDTimerKaleak = setTimeout("kaleakMugitu()", 1000);
        }
    } catch (e) {
        this.translateService.get('DaturikEz').subscribe((res: string) => {
              console.log(res);
              let alert = this.alertCtrl.create({
                title: 'ERROR',
                subTitle: res,
                buttons: ['OK']
              });
              alert.present();
          });
    }
  } 


}
