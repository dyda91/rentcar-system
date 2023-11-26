import { Veiculo } from "../veiculo/veiculo";

export class Cliente {
    nome: string;
    cpf: string;
    tipoCarteira: Habilitacao
    veiculoAlugado: Veiculo | null;
  
    constructor(nome: string, cpf: string, tipoCarteira: Habilitacao) {
      this.nome = nome;
      this.cpf = cpf;
      this.tipoCarteira = tipoCarteira;
      this.veiculoAlugado = null; 
    }

  }

  export enum Habilitacao {
    Moto = "A",
    Carro = "B"
  }