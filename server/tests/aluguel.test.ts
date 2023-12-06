import { Habilitacao, Cliente } from '../src/cliente/cliente';
import { Veiculo, Categoria } from '../src/veiculo/veiculo';
import { Aluguel } from '../src/aluguel/aluguel';

describe('Aluguel', () => {
    const veiculo = new Veiculo('ABC1234', 50, 'Modelo', 2023, Categoria.Carro);
    const cliente = new Cliente('Fulano', '12345678901', Habilitacao.Carro);
  
    test('deve criar um objeto Aluguel com os valores corretos', () => {
      const dataInicio = new Date('2023-11-01');
      const diasAluguel = 7;
      const valorAluguel = 350;
  
      const aluguel = new Aluguel(dataInicio, diasAluguel, veiculo, cliente, valorAluguel);
  
      expect(aluguel.dataInicio).toBe(dataInicio);
      expect(aluguel.diasAluguel).toBe(diasAluguel);
      expect(aluguel.veiculo).toBe(veiculo);
      expect(aluguel.cliente).toBe(cliente);
      expect(aluguel.valorAluguel).toBe(valorAluguel);
      expect(aluguel.status).toBe('Aberto');
    });
  });
