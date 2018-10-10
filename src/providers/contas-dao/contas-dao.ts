import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../database/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the ContasDaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContasDaoProvider {

  constructor(public dbProvider: DatabaseProvider) {}

    /**
     * getList
     */
    public getList() {
      return this.dbProvider.getDB().then((db: SQLiteObject)=>{
        let sql = "SELECT * FROM CONTAS";
        return db.executeSql(sql, []).then((data: any)=>{
          if (data.rows.length > 0){
            let contas: any[] = [];
            for(var i=0; i = data.rows.length; i++){
              contas.push(data.rows.item(i));
            }
          return contas;
          }else{
            return [];
          }
        }).catch((e)=> console.error("Erro", e));
      }).catch((e)=> console.error("Erro ao consultar", e));
    }

    /**
     * get
     */
    public get(id) {

    }

  /**
   * insert
   */
  public insert(conta) {

  }

  /**
   * update
   */
  public update(conta) {

  }

  /**
   * delete
   */
  public delete(id) {

  }
}
