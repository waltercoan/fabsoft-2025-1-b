import { Injectable } from '@angular/core';
import { Carro } from '../model/carro';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CarroService {
 
  apiURL = "http://localhost:8080/api/v1/carros";

  constructor(private http:HttpClient) { }

  getCarros(){
     return this.http.get<Carro[]>(this.apiURL);
  }
  saveCarro(carro:Carro){
    if(carro.id){
      return this.http.put(this.apiURL + '/' + carro.id, carro);
    }
    return this.http.post(this.apiURL,carro);
  }
  getCarroById(id: any) {
    return this.http.get<Carro>(this.apiURL + '/' + id);
  }
  excluirCarro(id: any){
    return this.http.delete<Carro>(this.apiURL + '/' + id);
  }
}
