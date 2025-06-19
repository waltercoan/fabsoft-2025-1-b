import { Cliente } from "./cliente";
import { Peca } from "./peca";
import { Servico } from "./servico";

export class Revisao {
    id: number;
    cliente: Cliente;
    dataEntrada: Date;
    dataSaida: Date;
    valor: number;
    pecasTrocadas: Peca[];
    servicosRealizados: Servico[];
}
