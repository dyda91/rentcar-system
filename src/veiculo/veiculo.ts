import { Cliente } from "../cliente/cliente";

export class Veiculo {
    placa: string;
    valorHora: number;
    alugado: boolean;
    modelo: string;
    ano: number;
    alugadoPor: Cliente | null;
    dataInicioAluguel: string | null; 
    
    constructor(placa: string, valorHora: number, modelo: string, ano: number) {
      this.placa = placa;
      this.valorHora = valorHora;
      this.alugado = false;
      this.modelo = modelo;
      this.ano = ano;
      this.alugadoPor = null;
      this.dataInicioAluguel = null; 
    }
  }

export class Carro extends Veiculo {}

export class Moto extends Veiculo {}
