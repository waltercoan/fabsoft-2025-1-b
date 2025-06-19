import { Component,ElementRef, ViewChild } from '@angular/core';
import { Carro } from '../model/carro';
import { CarroService } from '../service/carro.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-carro',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './carro.component.html',
  styleUrl: './carro.component.css',
  providers: [CarroService, Router]
})

export class CarroComponent {

    public listaCarros:Carro[] = [];

    @ViewChild('myModal') modalElement!: ElementRef;
    private modal!: bootstrap.Modal;

    private carroSelecionado!: Carro;
    
    constructor(
      private carroService:CarroService,
      private router:Router
    ){}

    ngOnInit(): void {
      this.carroService.getCarros().subscribe(resposta => {
          this.listaCarros = resposta;
      })
    }
    novo(){
      this.router.navigate(['carros/novo']);
    }
    alterar(carro:Carro){
      this.router.navigate(['carros/alterar', carro.id]);
    }

    abrirConfirmacao(carro:Carro) {
        this.carroSelecionado = carro;
        this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
        this.modal.show();
    }

    fecharConfirmacao() {
      this.modal.hide();
    }


    confirmarExclusao() {
        this.carroService.excluirCarro(this.carroSelecionado.id).subscribe(
            () => {
                this.fecharConfirmacao();
                this.carroService.getCarros().subscribe(
                  carros => {
                    this.listaCarros = carros;
                  }
                );
            },
            error => {
                console.error('Erro ao excluir cliente:', error);
            }
        );
    }


}
