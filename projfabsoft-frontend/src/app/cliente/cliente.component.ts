import { Component, ElementRef, ViewChild } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-cliente',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
  providers: [ClienteService, Router]
})
export class ClienteComponent {
    listaClientes: Cliente[] = [];

    @ViewChild('myModal') modalElement!: ElementRef;
    private modal!: bootstrap.Modal;

    private clienteSelecionado!: Cliente;

    constructor(
      private clienteService: ClienteService,
      private router:Router
    ) {}


    novo(){
      this.router.navigate(['clientes/novo']);
    }

    ngOnInit(){
      console.log("Carregando clientes...");
      this.clienteService.getClientes().subscribe(
        clientes => {
          this.listaClientes = clientes;
        }
      );
    }

    alterar(cliente:Cliente){
        this.router.navigate(['clientes/alterar', cliente.id]);
    }

    abrirConfirmacao(cliente:Cliente) {
        this.clienteSelecionado = cliente;
        this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
        this.modal.show();
    }

    fecharConfirmacao() {
      this.modal.hide();
    }

    confirmarExclusao() {
        this.clienteService.excluirCliente(this.clienteSelecionado.id).subscribe(
            () => {
                this.fecharConfirmacao();
                this.clienteService.getClientes().subscribe(
                  clientes => {
                    this.listaClientes = clientes;
                  }
                );
            },
            error => {
                console.error('Erro ao excluir cliente:', error);
            }
        );
    }

}
