import { Veiculo, Categoria } from '../src/veiculo/veiculo';

enum CategoriaMock {
  Carro = "carro",
  Moto = "moto"
}

const mapCategoriaMockToCategoria = (categoriaMock: CategoriaMock): Categoria => {
  switch (categoriaMock) {
    case CategoriaMock.Carro:
      return Categoria.Carro;
    case CategoriaMock.Moto:
      return Categoria.Moto;
    default:
      return Categoria.Carro; 
  }
};

jest.mock('../src/veiculo/veiculo', () => {
  const originalModule = jest.requireActual('../src/veiculo/veiculo');

  return {
    ...originalModule,
    Categoria: CategoriaMock,
    Veiculo: class MockedVeiculo extends originalModule.Veiculo {
      constructor(placa: string, valorHora: number, modelo: string, ano: number, categoria: CategoriaMock) {
        super(placa, valorHora, modelo, ano, mapCategoriaMockToCategoria(categoria));
      }
    }
  };
});

describe('Veiculo', () => {
  test('deve criar um objeto Veiculo com os valores corretos', () => {
    
    const veiculo = new Veiculo('ABC1234', 50, 'Modelo', 2023, CategoriaMock.Carro);

    expect(veiculo.placa).toBe('ABC1234');
    expect(veiculo.valorHora).toBe(50);
    expect(veiculo.alugado).toBe(false);
    expect(veiculo.modelo).toBe('Modelo');
    expect(veiculo.categoria).toBe(CategoriaMock.Carro); 
    expect(veiculo.ano).toBe(2023);
    expect(veiculo.alugadoPor).toBe(null);
    expect(veiculo.dataInicioAluguel).toBe(null);
  });
});
