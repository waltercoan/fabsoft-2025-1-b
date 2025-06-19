import { Injectable } from '@angular/core';
import { Revisao } from '../model/revisao';
import { Peca } from '../model/peca';
import { Servico } from '../model/servico';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RevisaoService {

  apiURL = "http://localhost:8080/api/v1/revisoes";

  constructor(private http:HttpClient) { }

  getRevisoes(){
     return this.http.get<Revisao[]>(this.apiURL);
  }
  getRevisaoById(id: any) {
    return this.http.get<Revisao>(this.apiURL + '/' + id);
  }
  saveRevisao(revisao:Revisao){
    if(revisao.id){
      return this.http.put(this.apiURL + '/' + revisao.id, revisao);
    }
    return this.http.post(this.apiURL,revisao);
  }

  excluirRevisao(id: any){
    return this.http.delete<Revisao>(this.apiURL + '/' + id);
  }
}
