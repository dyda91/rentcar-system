import * as readline from 'readline';
import { Cliente, Habilitacao } from './cliente/cliente';
import { Locadora } from './locadora/locadora';
import { Categoria } from './veiculo/veiculo';



const locadora = new Locadora();

class MenuTerminal {
  locadora: Locadora;
  rl: readline.Interface;

  constructor(locadora: Locadora) {
    this.locadora = locadora;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  exibirMenu() {
    console.log(`============ Menu ============
1. Cadastrar Veículo
2. Cadastrar Cliente
3. Alugar Veículo
4. Devolver Veículo
5. Listar Veículos Disponíveis
6. Listar Veículos Alugados
7. Mostrar Fatura do Cliente
8. Listar Aluguéis
9. Sair do Sistema
================================`);
    this.rl.question('\nEscolha uma opção: ', (resposta) => {
      this.tratarOpcao(resposta);
    });
  }

  tratarOpcao(opcao: string) {
    switch (opcao) {
      case '1':
        this.cadastrarVeiculo();
        break;
      case '2':
        this.cadastrarCliente();
        break;
      case '3':
        this.alugarVeiculo();
        break;
      case '4':
        this.devolverVeiculo();
        break;
      case '5':
        this.listarVeiculosDisponiveis();
        break;
      case '6':
        this.listarVeiculosAlugados();
        break;
      case '7':
        this.mostrarFaturaCliente();
        break;
      case '8':
        this.locadora.listarlistaAlugueis();
        this.exibirMenu();
        break;
      case '9':
        console.log('Saindo do Sistema...');
        this.rl.close();
        break;
      default:
        console.log('Opção inválida. Escolha novamente.');
        this.exibirMenu()
        break;
    }
  }


  cadastrarVeiculo() {
    this.rl.question('\nDigite a placa do veículo (Sete Digitos): ', (placa) => {
      if (this.locadora.veiculoExistente(placa)) {
        console.log('\nVeículo com essa placa já cadastrado.');
        this.exibirMenu();
        return;
      }
  
      this.rl.question('Digite o modelo do veículo: ', (modelo) => {
        this.rl.question('Digite a categoria do veículo (Carro/Moto): ', (categoria) => {
          categoria = categoria.toLowerCase();
          if (categoria !== 'carro' && categoria !== 'moto') {
            console.log('\nCategoria inválida. Por favor, digite "Carro" ou "Moto".');
            this.cadastrarVeiculo(); 
            return;
          }
  
          const categoriaEscolhida = categoria === 'carro' ? Categoria.Carro : Categoria.Moto;
  
          this.rl.question('Digite o ano do veículo: ', (ano) => {
            this.rl.question('Digite o valor da hora de aluguel: ', (valor) => {
              const valorHora = Number(valor);
              const anoNumber = Number(ano);
  
              this.locadora.cadastrarVeiculo(placa, valorHora, modelo, categoriaEscolhida, anoNumber);
              this.exibirMenu();
            });
          });
        });
      });
    });
  }

  cadastrarCliente() {
    this.rl.question('\nDigite o nome do cliente: ', (nome) => {
      this.rl.question('Digite o CPF do cliente (Onze Digitos - Somente números): ', (cpf) => {
        this.rl.question('Digite o tipo de carteira (A/B): ', (tipo) => {
          tipo = tipo.toUpperCase();
          
          if (tipo !== 'A' && tipo !== 'B') {
            console.log('Tipo de carteira inválido. Por favor, digite "A" para Moto ou "B" para Carro.');
            this.cadastrarCliente(); 
            return;
          }
          
          const tipoCarteira = tipo === 'A' ? Habilitacao.Moto : Habilitacao.Carro;
  
          this.locadora.cadastrarCliente(nome, cpf, tipoCarteira);
          this.exibirMenu();
        });
      });
    });
  }

  alugarVeiculo() {
    this.rl.question('\nDigite o CPF do cliente: ', (cpf) => {
      const clienteExistente = this.locadora.clientes.find((c) => c.cpf === cpf);
  
      if (clienteExistente) {
        this.rl.question('Digite a placa do veículo a ser alugado: ', (placaVeiculo) => {
          const veiculo = this.locadora.veiculos.find((veiculo) => veiculo.placa === placaVeiculo);
  
          if (!veiculo) {
            console.log(`\n------------------------------------------------------------
  Veículo não encontrado.
  ------------------------------------------------------------`);
            this.exibirMenu();
            return;
          }
  
          if (veiculo.alugado) {
            console.log(`\n------------------------------------------------------------
  Veículo já alugado.
  ------------------------------------------------------------`);
            this.exibirMenu();
            return;
          }
  
          this.rl.question('Digite a data de início do aluguel (DD/MM/AAAA): ', (dataInicio) => {
            this.rl.question('Digite a quantidade de dias de aluguel: ', (diasInput) => {
              const diasAluguel = Number(diasInput);
  
              if (
                (clienteExistente.tipoCarteira === "A" && veiculo.categoria === Categoria.Moto) ||
                (clienteExistente.tipoCarteira === "B" && veiculo.categoria === Categoria.Carro)
              ) {
                this.locadora.alugarVeiculo(clienteExistente, placaVeiculo, diasAluguel);
                this.exibirMenu();
              } else {
                console.log(`\n------------------------------------------------------------
  Tipo de carteira não permite alugar esse veículo.
  ------------------------------------------------------------`);
                this.exibirMenu();
              }
            });
          });
        });
      } else {
        this.rl.question('Digite o nome do cliente: ', (nome) => {
          this.rl.question('Digite o tipo de carteira (A/B): ', (tipo) => {
            const tipoCarteira = Habilitacao[tipo as keyof typeof Habilitacao]
            const novoCliente = new Cliente(nome, cpf, tipoCarteira);
            this.locadora.clientes.push(novoCliente);

            this.rl.question('Digite a placa do veículo a ser alugado: ', (placaVeiculo) => {
              const veiculo = this.locadora.veiculos.find((veiculo) => veiculo.placa === placaVeiculo);

              if (!veiculo) {
                console.log(`\n------------------------------------------------------------
Veículo não encontrado.
------------------------------------------------------------`);
                this.exibirMenu();
                return;
              }

              if (veiculo.alugado) {
                console.log(`\n------------------------------------------------------------
Veículo já alugado.
------------------------------------------------------------`);
                this.exibirMenu();
                return;
              }

              this.rl.question('Digite a quantidade de dias de aluguel: ', (diasInput) => {
                const diasAluguel = Number(diasInput);

                this.locadora.alugarVeiculo(novoCliente, placaVeiculo, diasAluguel);
                this.exibirMenu();
              });
            });
          });
        });
      }
    });
  }


  devolverVeiculo() {
    this.rl.question('\nDigite o CPF do cliente que está devolvendo o veículo: ', (cpf) => {
      const cliente = this.locadora.clientes.find((c) => c.cpf === cpf);

      if (!cliente) {
        console.log(`\n------------------------------------------------------------
Cliente não encontrado.
------------------------------------------------------------`);
        this.exibirMenu();
        return;
      }

      this.rl.question('Digite a placa do veículo a ser devolvido: ', (placa) => {
        this.locadora.devolverVeiculo(cliente, placa);
        this.exibirMenu();
      });
    });
  }

  listarVeiculosDisponiveis() {
    const veiculosDisponiveis = this.locadora.veiculos.filter((veiculo) => !veiculo.alugado);

    if (veiculosDisponiveis.length === 0) {
      console.log(`\n------------------------------------------------------------
Não há veículos disponíveis no momento.
------------------------------------------------------------`);
      return this.exibirMenu();
    }

    console.log(`\n------------------------------------------------------------
| Placa     | Modelo - Ano          | Valor/Hora  |
------------------------------------------------------------
    `);
    veiculosDisponiveis.forEach((veiculo) => {
      const formattedModelo = `${veiculo.modelo} - ${veiculo.ano}`;
      const placaSpaces = ' '.repeat(10 - veiculo.placa.length);
      const modeloSpaces = ' '.repeat(18 - formattedModelo.length);
      const valorHoraSpaces = ' '.repeat(12 - veiculo.valorHora.toString().length);

      console.log(`| ${veiculo.placa}${placaSpaces} | ${formattedModelo}${modeloSpaces} | ${veiculo.valorHora}${valorHoraSpaces} |`);
    });
    console.log('------------------------------------------------------------');
    this.exibirMenu();
  }

  listarVeiculosAlugados() {
    const veiculosAlugados = this.locadora.veiculos.filter((veiculo) => veiculo.alugado);

    if (veiculosAlugados.length === 0) {
      console.log(`\n------------------------------------------------------------
Não há veículos alugados no momento.
------------------------------------------------------------`);
      return this.exibirMenu();
    }

    console.log(`\nVeículos alugados:
------------------------------------------------------------
| Placa       | Modelo            | Cliente                |
------------------------------------------------------------`);
    veiculosAlugados.forEach((veiculo) => {
      const clienteInfo = veiculo.alugadoPor
        ? `${veiculo.alugadoPor.nome} - ${veiculo.alugadoPor.cpf}`
        : 'Sem cliente';

      const formattedModelo = `${veiculo.modelo} - ${veiculo.ano}`;
      const placaSpaces = ' '.repeat(10 - veiculo.placa.length);
      const modeloSpaces = ' '.repeat(18 - formattedModelo.length);
      const clienteSpaces = ' '.repeat(26 - clienteInfo.length);

      console.log(`| ${veiculo.placa}${placaSpaces} | ${formattedModelo}${modeloSpaces} | ${clienteInfo}${clienteSpaces} |`);
    });
    console.log('------------------------------------------------------------');
    this.exibirMenu();
  }

  mostrarFaturaCliente() {
    this.rl.question('\nDigite o CPF do cliente para mostrar a fatura: ', (cpf) => {
      const cliente = this.locadora.clientes.find((c) => c.cpf === cpf);

      if (!cliente || !cliente.veiculoAlugado) {
        console.log(`\n------------------------------------------------------------
Cliente não encontrado ou não possui veículo alugado.
------------------------------------------------------------`);
        this.exibirMenu();
        return;
      }

      this.locadora.mostrarFaturas(cliente);
      this.exibirMenu();
    });
  }
}

const menuTerminal = new MenuTerminal(locadora);
menuTerminal.exibirMenu();