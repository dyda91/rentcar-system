import { Categoria, Veiculo} from "../veiculo/veiculo";
import { Cliente, Habilitacao } from "../cliente/cliente";
import { Aluguel } from "../aluguel/aluguel";

export class Locadora {
  veiculos: Veiculo[];
  clientes: Cliente[];
  listaAlugueis: Aluguel[];

  constructor() {
    this.veiculos = [];
    this.clientes = [];
    this.listaAlugueis = [];
  }

  cadastrarVeiculo(placa: string, valorHora: number, modelo: string, categoria: Categoria, ano: number) {
    if (this.veiculoExistente(placa)) {
      console.log(`\n------------------------------------------------------------
Já existe um Veículo cadastrado com essa a placa ${placa}.
------------------------------------------------------------\n`);
      return;
    }

    if(placa.length != 7 ) {
      console.log(`\n------------------------------------------------------------
Placa não válida
------------------------------------------------------------\n`);
      return;
    }

//     if(categoria != Categoria.Carro || Categoria.Moto){
//       console.log(`\n------------------------------------------------------------
// Categoria não válida.
// ------------------------------------------------------------\n`);
//       return;
//     }

    const novoVeiculo = new Veiculo(placa, valorHora, modelo, ano, categoria);
    this.veiculos.push(novoVeiculo);
    console.log(`\n------------------------------------------------------------
Veículo cadastrado com sucesso.
------------------------------------------------------------\n`);
  }

  cadastrarCliente(nome: string, cpf: string, tipoCarteira: Habilitacao) {
    if (this.clienteExistente(cpf)) {
      console.log(`\n------------------------------------------------------------
Cliente com esse CPF já cadastrado.
------------------------------------------------------------\n`);
      return;
    }


    if (cpf.length != 11 && this.temLetranoCPF(cpf) == true) {
      console.log(`\n------------------------------------------------------------
CPF não válido
------------------------------------------------------------\n`);
      return;
    }
    
    
//     if(tipoCarteira != Habilitacao.Carro || Habilitacao.Moto) {
//       console.log(`\n------------------------------------------------------------
// Habilitação não válida.
// ------------------------------------------------------------\n`);
//       return;
//     }

    const novoCliente = new Cliente(nome, cpf, tipoCarteira);
    this.clientes.push(novoCliente);
    console.log(`\n------------------------------------------------------------
Cliente cadastrado com sucesso.
------------------------------------------------------------\n`);
  }

  clienteExistente(cpf: string): boolean {
    return this.clientes.some((cliente) => cliente.cpf === cpf);
  }

  veiculoExistente(placa: string): boolean {
    return this.veiculos.some((veiculo) => veiculo.placa === placa);
  }

  temLetranoCPF(cpf: string) {
    for (const char of cpf) {
      if (/[a-zA-Z]/.test(char)) {
        return true;
      }
    }
  }

  alugarVeiculo(cliente: Cliente, placa: string, dias: number) {
    const veiculo = this.veiculos.find((veiculo) => veiculo.placa === placa);

    if (!veiculo) {
      console.log(`\n------------------------------------------------------------
Veículo não encontrado.
------------------------------------------------------------\n`);
      return;
    }

    if (veiculo.alugado) {
      console.log(`\n------------------------------------------------------------
Veículo já alugado.
------------------------------------------------------------\n`);
      return;
    }

    if (
      (cliente.tipoCarteira === 'A' && !(veiculo.categoria != Categoria.Carro)) ||
      (cliente.tipoCarteira === 'B' && !(veiculo.categoria != Categoria.Moto))
    ) {
      console.log(`\n------------------------------------------------------------
Tipo de carteira não permite alugar este veículo.
------------------------------------------------------------\n`);
      return;
    }

    if (cliente.veiculoAlugado) {
      console.log(`\n------------------------------------------------------------
Cliente já possui um veículo alugado.
------------------------------------------------------------\n`);
      return;
    }

    veiculo.alugado = true;
    veiculo.alugadoPor = cliente;
    cliente.veiculoAlugado = veiculo;

    const dataAtual = new Date();
    const valorAluguel = veiculo.valorHora * 24 * dias;

    const novoAluguel = new Aluguel(dataAtual, dias, veiculo, cliente, valorAluguel);
    this.listaAlugueis.push(novoAluguel);

    veiculo.dataInicioAluguel = `${dataAtual.getDate()}/${dataAtual.getMonth() + 1}/${dataAtual.getFullYear()}`;

    console.log(`\n------------------------------------------------------------
Veículo alugado com sucesso. Valor do aluguel: ${valorAluguel}
------------------------------------------------------------\n`);
  }

  devolverVeiculo(cliente: Cliente, placa: string) {
    const veiculo = this.veiculos.find((veiculo) => veiculo.placa === placa);

    if (!veiculo) {
      console.log(`\n------------------------------------------------------------
Veículo não encontrado.
------------------------------------------------------------\n`);
      return;
    }

    if (!veiculo.alugado) {
      console.log(`\n------------------------------------------------------------
Veículo não está alugado no momento.
------------------------------------------------------------\n`);
      return;
    }

    if (cliente.veiculoAlugado !== veiculo) {
      console.log(`\n------------------------------------------------------------
Este veículo não foi alugado por este cliente.
------------------------------------------------------------\n`);
      return;
    }

    veiculo.alugado = false;
    veiculo.alugadoPor = null;
    cliente.veiculoAlugado = null;

    const aluguel = this.listaAlugueis.find(aluguel => aluguel.veiculo === veiculo);
    if (aluguel) {
      aluguel.status = 'Encerrado';
    }

    console.log(`\n------------------------------------------------------------
Veículo devolvido com sucesso.
------------------------------------------------------------\n`);
  }
  listarVeiculosDisponiveis() {
    const veiculosDisponiveis = this.veiculos.filter((veiculo) => !veiculo.alugado);
    console.log('\nVeículos disponíveis:');
    console.log(`${veiculosDisponiveis}\n`);
  }

  listarVeiculosAlugados() {
    const veiculosAlugados = this.veiculos.filter((veiculo) => veiculo.alugado);
    console.log('\nVeículos alugados:');
    console.log(`${veiculosAlugados}\n`);
  }

  mostrarFaturas(cliente: Cliente) {
    const faturas = this.listaAlugueis.filter(aluguel => aluguel.cliente === cliente);

    if (faturas.length === 0) {
      console.log(`\n------------------------------------------------------------
Este cliente não possui faturas.
------------------------------------------------------------\n`);
      return;
    }

    console.log(`\nFaturas para ${cliente.nome}:`);
    faturas.forEach((aluguel, index) => {
      const data = aluguel.dataInicio.toLocaleDateString('pt-BR');
      console.log(`\n--------------------------------------
Fatura ${index + 1}:
Data de Início: ${data}
Quantidade de Dias: ${aluguel.diasAluguel}
Status: ${aluguel.status}
Veículo: ${aluguel.veiculo.modelo} - Placa: ${aluguel.veiculo.placa}
Valor: ${aluguel.valorAluguel}
--------------------------------------\n`);
    });
  }

  listarlistaAlugueis() {
    if (this.listaAlugueis.length === 0) {
      console.log(`\n------------------------------------------------------------
Não há aluguéis ativos no momento.
------------------------------------------------------------\n`);
      return;
    }

    console.log(`\nAluguéis Ativos:
    --------------------------------------`);
    this.listaAlugueis.forEach((aluguel, index) => {
      console.log(`Aluguel ${index + 1}:
Data de Início: ${aluguel.dataInicio}
Quantidade de Dias: ${aluguel.diasAluguel}
Cliente: ${aluguel.cliente.nome}
Veículo: ${aluguel.veiculo.modelo} - Placa: ${aluguel.veiculo.placa}
Status: ${aluguel.status}
Valor: ${aluguel.valorAluguel}
--------------------------------------\n`);
    });
  }
}
