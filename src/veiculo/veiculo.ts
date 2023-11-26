import { Cliente } from "../cliente/cliente";

export class Veiculo {
    placa: string;
    valorHora: number;
    alugado: boolean;
    modelo: string;
    categoria: Categoria;
    ano: number;
    alugadoPor: Cliente | null;
    dataInicioAluguel: string | null; 
    
    constructor(placa: string, valorHora: number, modelo: string, ano: number, categoria: Categoria) {
      this.placa = placa;
      this.valorHora = valorHora;
      this.alugado = false;
      this.modelo = modelo;
      this.categoria = categoria;
      this.ano = ano;
      this.alugadoPor = null;
      this.dataInicioAluguel = null; 
    }
  }

  export enum Categoria {
    Carro = "carro",
    Moto = "moto"
  }

export class Carro extends Veiculo {}

export class Moto extends Veiculo {}
