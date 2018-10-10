import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(public sqlite: SQLite) {  }
  /*
  Esta função tem o objetivo de criar ou abrir o banco de dados
  */

  getDB(){
    return this.sqlite.create({
      name: 'lp4-finance',
      location: 'default'
    });
  }

  //Cria a estrutura inicial do DB
  createDataBase(){
    return this.getDB().then((db: SQLiteObject)=>{
      //cria as tabelas
      this.createTables(db);
      // insere os dados iniciais
      this.insertDefault(db);
    }).catch();
  }

  //cria as tabelas padroes do app
  private createTables(db: SQLiteObject){
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS CONTAS ( ID INTEGER PRIMARY KEY AUTOINCREMENT,DESCRICAO TEXT)']
    ]).then(()=>console.log("Tabelas criadas com sucesso")).catch((e)=> console.error("Erro ao criar tabelas", e));
  };

  //Insere registros padrao
  private insertDefault(db: SQLiteObject){
    db.executeSql('SELECT COUNT(ID) AS QNTD FROM CONTAS', <any>{}).then((data: any)=>{
      if(data.rows.iten(0).QNTD == 0){
        //inserir contas
        db.sqlBatch([
          ['INSERT INTO CONTAS (DESCRICAO) VALUES (?)', ['Alimentação']],
          ['INSERT INTO CONTAS (DESCRICAO) VALUES (?)', ['Saude']],
          ['INSERT INTO CONTAS (DESCRICAO) VALUES (?)', ['Transporte']]
        ]).then(()=> console.log("Contas inseridas com sucesso")).catch((e)=> console.error("Erro ao inserir dados", e));
      }
    }).catch((e)=>console.error("Erro ao consultar contas", e));
  }
}
