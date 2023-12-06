import { Locadora } from '../src/locadora/locadora';
import { Cliente, Habilitacao } from '../src/cliente/cliente';
import { Veiculo, Categoria } from '../src/veiculo/veiculo';
import { Aluguel } from '../src/aluguel/aluguel';

describe('Locadora', () => {
  let locadora: Locadora;

  

  beforeEach(() => {
    locadora = new Locadora();
  });

  test('deve cadastrar um veículo corretamente', () => {
    locadora.cadastrarVeiculo('ABC1234', 50, 'Modelo', Categoria.Carro, 2023);
    expect(locadora.veiculos.length).toBe(1);
  });

  test('deve cadastrar um cliente corretamente', () => {
    locadora.cadastrarCliente('Fulano', '12345678901', Habilitacao.Carro);
    expect(locadora.clientes.length).toBe(1);
  });

});

describe('Locadora', () => {
    let locadora: Locadora;
    let cliente: Cliente;
    let veiculo: Veiculo;

    beforeEach(() => {
      locadora = new Locadora();
    });
  
    test('deve cadastrar um veículo corretamente', () => {
      locadora.cadastrarVeiculo('ABC1234', 50, 'Modelo', Categoria.Carro, 2023);
      expect(locadora.veiculos.length).toBe(1);
    });
  
    test('deve cadastrar um cliente corretamente', () => {
      locadora.cadastrarCliente('Fulano', '12345678901', Habilitacao.Carro);
      expect(locadora.clientes.length).toBe(1);
    });

  
    beforeEach(() => {
      locadora = new Locadora();
      cliente = new Cliente('Fulano', '12345678901', Habilitacao.Carro);
      veiculo = new Veiculo('ABC1234', 50, 'Modelo', 2023, Categoria.Carro);
      locadora.cadastrarCliente(cliente.nome, cliente.cpf, cliente.tipoCarteira);
      locadora.cadastrarVeiculo(veiculo.placa, veiculo.valorHora, veiculo.modelo, veiculo.categoria, veiculo.ano);
    });
  
    test('deve alugar um veículo corretamente', () => {
        locadora.alugarVeiculo(cliente, veiculo.placa, 3);
        const veiculoAlugado = locadora.veiculos.find(v => v.placa === veiculo.placa);
        expect(veiculoAlugado?.alugado).toBe(true);
        expect(veiculoAlugado?.alugadoPor).toBe(cliente);
        expect(cliente.veiculoAlugado).toBe(veiculoAlugado);
      });
  
    test('deve devolver um veículo corretamente', () => {
      locadora.alugarVeiculo(cliente, veiculo.placa, 3);
      locadora.devolverVeiculo(cliente, veiculo.placa);
      expect(veiculo.alugado).toBe(false);
      expect(veiculo.alugadoPor).toBe(null);
      expect(cliente.veiculoAlugado).toBe(null);
    });
  
    test('deve listar veículos disponíveis corretamente', () => {
      locadora.alugarVeiculo(cliente, veiculo.placa, 3);
      const veiculosDisponiveis = locadora.listarVeiculosDisponiveis();
      expect(veiculosDisponiveis).toEqual([]);
    });
  
    test('deve listar veículos alugados corretamente', () => {
        locadora.alugarVeiculo(cliente, veiculo.placa, 3);
        const veiculosAlugados = locadora.listarVeiculosAlugados();
        expect(veiculosAlugados[0]).toBe(veiculo);
      });
      
  });