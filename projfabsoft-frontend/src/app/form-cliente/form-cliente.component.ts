import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-cliente',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './form-cliente.component.html',
  styleUrl: './form-cliente.component.css',
  providers: [ClienteService, Router]
})
export class FormClienteComponent {
    cliente: Cliente = new Cliente();

    constructor(
      private clienteService:ClienteService,
      private router:Router
    ){}

    salvar(){
      this.clienteService.saveCliente(this.cliente)
        .subscribe(resultado => {
            this.router.navigate(['clientes']);
        });
    }
}
