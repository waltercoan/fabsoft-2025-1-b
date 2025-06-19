import { Component,ElementRef, ViewChild } from '@angular/core';
import { Revisao } from '../model/revisao';
import { RevisaoService } from '../service/revisao.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';

import { Peca } from '../model/peca';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-form-revisao',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './form-revisao.component.html',
  styleUrl: './form-revisao.component.css',
  providers: [RevisaoService, Router, ClienteService]
})

export class FormRevisaoComponent {
    revisao:Revisao = new Revisao();

    peca:Peca = new Peca();
    @ViewChild('myModalPeca') modalElementPeca!: ElementRef;
    private modalPeca!: bootstrap.Modal;

    public listaClientes:Cliente[] = [];

    constructor(
      private revisaoService: RevisaoService,
      private router: Router,
      private clienteService: ClienteService,
      private activeRouter: ActivatedRoute
    ) {
        const id = this.activeRouter.snapshot.paramMap.get('id');
        
        this.clienteService.getClientes().subscribe(clientes =>{
            this.listaClientes = clientes;
        });

        if (id) {
          this.revisaoService.getRevisaoById(id).subscribe(revisao => {
            this.revisao = revisao;
        });
      }
    }

    salvar(){
      this.revisaoService.saveRevisao(this.revisao)
          .subscribe( res => {
            this.router.navigate(['revisoes']);
          });
    }

    comparaClientes(obj1: Cliente, obj2: Cliente): boolean {
      return obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2;
    }
    incluirPeca():void{
      this.peca = new Peca();
      this.modalPeca = new bootstrap.Modal(this.modalElementPeca.nativeElement);
      this.modalPeca.show();
    }
    salvaPeca():void{
      if(this.revisao.pecasTrocadas == null){
          this.revisao.pecasTrocadas = [];
      }
      this.revisao.pecasTrocadas.push(this.peca);
      this.modalPeca.hide();
    }
    fecharConfirmacaoPeca():void{
      this.modalPeca.hide();
    }

    excluirPeca(peca: Peca): void{
      this.revisao.pecasTrocadas = 
        this.revisao.pecasTrocadas.filter((p) => p.id !== peca.id);
    }
    
    
}
