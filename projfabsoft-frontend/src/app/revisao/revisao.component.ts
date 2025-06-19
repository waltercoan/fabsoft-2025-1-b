import { Component,ElementRef, ViewChild } from '@angular/core';
import { Revisao } from '../model/revisao';
import { RevisaoService } from '../service/revisao.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-revisao',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './revisao.component.html',
  styleUrl: './revisao.component.css',
  providers: [RevisaoService, Router]
})
export class RevisaoComponent {
    public listaRevisoes:Revisao[] = [];

    @ViewChild('myModal') modalElement!: ElementRef;
    private modal!: bootstrap.Modal;

    private revisaoSelecionada!: Revisao;
        
    constructor(
      private revisaoService:RevisaoService,
      private router:Router
    ){}

    ngOnInit(): void {
      this.revisaoService.getRevisoes().subscribe(resposta => {
          this.listaRevisoes = resposta;
      })
    }
    novo(){
      this.router.navigate(['revisoes/novo']);
    }
    alterar(revisao:Revisao){
      this.router.navigate(['revisoes/alterar', revisao.id]);
    }

    abrirConfirmacao(revisao:Revisao) {
        this.revisaoSelecionada = revisao;
        this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
        this.modal.show();
    }

    fecharConfirmacao() {
      this.modal.hide();
    }


    confirmarExclusao() {
        this.revisaoService.excluirRevisao(this.revisaoSelecionada.id).subscribe(
            () => {
                this.fecharConfirmacao();
                this.revisaoService.getRevisoes().subscribe(
                  revisoes => {
                    this.listaRevisoes = revisoes;
                  }
                );
            },
            error => {
                console.error('Erro ao excluir revisão:', error);
            }
        );
    }
}
