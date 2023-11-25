import { Veiculo, Carro, Moto } from "../veiculo/veiculo";
import { Cliente } from "../cliente/cliente";
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
  
    cadastrarVeiculo(placa: string, valorHora: number, modelo: string, ano: number) {
      if (this.veiculoExistente(placa)) {
        console.log('Veículo com essa placa já cadastrado.');
        return;
      }
      const novoVeiculo = new Veiculo(placa, valorHora, modelo, ano);
      this.veiculos.push(novoVeiculo);
      console.log('Veículo cadastrado com sucesso.');
    }
  
    cadastrarCliente(nome: string, cpf: string, tipoCarteira: 'A' | 'B') {
      if (this.clienteExistente(cpf)) {
        console.log('Cliente com esse CPF já cadastrado.');
        return;
      }
      const novoCliente = new Cliente(nome, cpf, tipoCarteira);
      this.clientes.push(novoCliente);
      console.log('Cliente cadastrado com sucesso.');
    }
  
    clienteExistente(cpf: string): boolean {
      return this.clientes.some((cliente) => cliente.cpf === cpf);
    }
  
    veiculoExistente(placa: string): boolean {
      return this.veiculos.some((veiculo) => veiculo.placa === placa);
    }
  
    alugarVeiculo(cliente: Cliente, placa: string, dias: number) {
      const veiculo = this.veiculos.find((veiculo) => veiculo.placa === placa);
    
      if (!veiculo) {
        console.log('Veículo não encontrado.');
        return;
      }
    
      if (veiculo.alugado) {
        console.log('Veículo já alugado.');
        return;
      }
  
      if (
        (cliente.tipoCarteira === 'A' && !(veiculo instanceof Moto)) ||
        (cliente.tipoCarteira === 'B' && !(veiculo instanceof Carro))
      ) {
        console.log('Tipo de carteira não permite alugar este veículo.');
        return;
      }
  
      if (cliente.veiculoAlugado) {
        console.log('Cliente já possui um veículo alugado.');
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
  
    console.log(`Veículo alugado com sucesso. Valor do aluguel: ${valorAluguel}`);
    }
  
    devolverVeiculo(cliente: Cliente, placa: string) {
      const veiculo = this.veiculos.find((veiculo) => veiculo.placa === placa);
  
      if (!veiculo) {
        console.log('Veículo não encontrado.');
        return;
      }
  
      if (!veiculo.alugado) {
        console.log('Veículo não está alugado no momento.');
        return;
      }
  
      if (cliente.veiculoAlugado !== veiculo) {
        console.log('Este veículo não foi alugado por este cliente.');
        return;
      }
  
      veiculo.alugado = false;
      veiculo.alugadoPor = null;
      cliente.veiculoAlugado = null;
  
      const aluguel = this.listaAlugueis.find(aluguel => aluguel.veiculo === veiculo);
      if (aluguel) {
        aluguel.status = 'Encerrado'; 
      }
  
      console.log('Veículo devolvido com sucesso.');
    }
    listarVeiculosDisponiveis() {
      const veiculosDisponiveis = this.veiculos.filter((veiculo) => !veiculo.alugado);
      console.log('Veículos disponíveis:');
      console.log(veiculosDisponiveis);
    }
  
    listarVeiculosAlugados() {
      const veiculosAlugados = this.veiculos.filter((veiculo) => veiculo.alugado);
      console.log('Veículos alugados:');
      console.log(veiculosAlugados);
    }
  
    mostrarFaturas(cliente: Cliente) {
      const faturas = this.listaAlugueis.filter(aluguel => aluguel.cliente === cliente);
      
      if (faturas.length === 0) {
        console.log('Este cliente não possui faturas.');
        return;
      }
  
      console.log(`Faturas para ${cliente.nome}:`);
      faturas.forEach((aluguel, index) => {
        const data = aluguel.dataInicio.toLocaleDateString('pt-BR');
        console.log(`Fatura ${index + 1}:`);
        console.log(`  Data de Início: ${data}`);
        console.log(`  Quantidade de Dias: ${aluguel.diasAluguel}`);
        console.log(`  Status: ${aluguel.status}`);
        console.log(`  Veículo: ${aluguel.veiculo.modelo} - Placa: ${aluguel.veiculo.placa}`);
        console.log(`  Valor: ${aluguel.valorAluguel}`);
        console.log('--------------------------------------');
      });
    }
  
    listarlistaAlugueis() {
      if (this.listaAlugueis.length === 0) {
        console.log('Não há aluguéis ativos no momento.');
        return;
      }
  
      console.log('Aluguéis Ativos:');
      console.log('--------------------------------------');
      this.listaAlugueis.forEach((aluguel, index) => {
        console.log(`Aluguel ${index + 1}:`);
        console.log(`  Data de Início: ${aluguel.dataInicio}`);
        console.log(`  Quantidade de Dias: ${aluguel.diasAluguel}`);
        console.log(`  Cliente: ${aluguel.cliente.nome}`);
        console.log(`  Veículo: ${aluguel.veiculo.modelo} - Placa: ${aluguel.veiculo.placa}`);
        console.log(`  Status: ${aluguel.status}`);
        console.log(`  Valor: ${aluguel.valorAluguel}`);
        console.log('--------------------------------------');
      });
    }
  }
