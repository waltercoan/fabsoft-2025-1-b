import { Component } from '@angular/core';
import { Carro } from '../model/carro';
import { CarroService } from '../service/carro.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-form-carro',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './form-carro.component.html',
  styleUrl: './form-carro.component.css',
  providers: [CarroService, Router, ClienteService]
})

export class FormCarroComponent {
    carro:Carro = new Carro();
    
    public listaClientes:Cliente[] = [];
    

    constructor(
      private carroService: CarroService,
      private clienteService: ClienteService,
      private router: Router,
      private activeRouter: ActivatedRoute
    ) {
        const id = this.activeRouter.snapshot.paramMap.get('id');
        this.clienteService.getClientes().subscribe(clientes =>{
            this.listaClientes = clientes;
        });

        if (id) {
          this.carroService.getCarroById(id).subscribe(carro => {
            this.carro = carro;
          });
        }
    }

    salvar(){
      this.carroService.saveCarro(this.carro)
          .subscribe( res => {
            this.router.navigate(['carros']);
          });
    }

    comparaClientes(obj1: Cliente, obj2: Cliente): boolean {
      return obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2;
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
              const base64String = reader.result as string;
              this.carro.foto = base64String.split(',')[1]; 
              this.carro.arquivoFoto = file.name; 
              this.carro.mimeType = file.type;
            };
            reader.readAsDataURL(file);
        }
    }
}

