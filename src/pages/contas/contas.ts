import { ContasDaoProvider } from './../../providers/contas-dao/contas-dao';
import { ContasAddPage } from './../contas-add/contas-add';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the ContasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contas',
  templateUrl: 'contas.html',
})
export class ContasPage {

  public listContas: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public daoContas: ContasDaoProvider) {
  this.getList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContasPage');
  }

  toContasAdd(){
    this.navCtrl.push(ContasAddPage);
  };

  getList(){
    this.daoContas.getList().then((data:any)=>{
      this.listContas = data;
    }).catch((e) => console.error("Nao foi possivel encontrar os dados",e));
  }

}
