import { Cliente, Habilitacao } from "./../src/cliente/cliente";

describe('Cliente', () => {
    test('deve criar um objeto Cliente com os valores corretos', () => {
      const cliente = new Cliente('Fulano', '12345678901', Habilitacao.Carro);
  
      expect(cliente.nome).toBe('Fulano');
      expect(cliente.cpf).toBe('12345678901');
      expect(cliente.tipoCarteira).toBe(Habilitacao.Carro);
      expect(cliente.veiculoAlugado).toBe(null);
    });
  });