import { Cliente } from './../cliente/cliente';
import { Veiculo } from "../veiculo/veiculo";

export class Aluguel {
    dataInicio: Date;
    diasAluguel: number;
    veiculo: Veiculo;
    cliente: Cliente;
    valorAluguel: number;
    status: 'Aberto' | 'Encerrado';
  
    constructor(dataInicio: Date, diasAluguel: number, veiculo: Veiculo, cliente: Cliente, valorAluguel: number) {
      this.dataInicio = dataInicio;
      this.diasAluguel = diasAluguel;
      this.veiculo = veiculo;
      this.cliente = cliente;
      this.valorAluguel = valorAluguel;
      this.status = 'Aberto'; 
    }
  }