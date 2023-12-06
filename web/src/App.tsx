import { useState, useEffect, useRef } from 'react';
import { Locadora } from '../../server/src/locadora/locadora';
import { Habilitacao, Cliente } from '../../server/src/cliente/cliente';
import { Veiculo, Categoria } from '../../server/src/veiculo/veiculo';

const CadastroVeiculoComponent = () => {
  const [placa, setPlaca] = useState('');
  const [valorHora, setValorHora] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [categoria, setCategoria] = useState<Categoria>(Categoria.Carro);
  const [veiculosDisponiveis, setVeiculosDisponiveis] = useState<Veiculo[] | []>([]); 
  const [nomeCliente, setNomeCliente] = useState('');
  const [cpfCliente, setCpfCliente] = useState('');
  const [tipoCarteira, setTipoCarteira] = useState('');
  const [clientes, setClientes] = useState<Cliente[] | []>([]);
  const locadoraRef = useRef(new Locadora());

  const handleCadastroVeiculo = () => {
    const valorHoraNum = parseFloat(valorHora);
    const anoNum = parseInt(ano);

    locadoraRef.current.cadastrarVeiculo(placa, valorHoraNum, modelo, categoria, anoNum);
    listarVeiculosDisponiveis();
  };

  const handleCadastroCliente = () => {
    const tipoCarteiraEnum = tipoCarteira as Habilitacao; 
    locadoraRef.current.cadastrarCliente(nomeCliente, cpfCliente, tipoCarteiraEnum);
    listarClientesCadastrados(); 
  };
  
  const listarVeiculosDisponiveis = () => {
    const veiculos = locadoraRef.current.listarVeiculosDisponiveis();
    setVeiculosDisponiveis(veiculos);
  };

  const listarClientesCadastrados = () => {
    const clientesCadastrados = locadoraRef.current.clientes.filter((cliente) => locadoraRef.current.clienteExistente(cliente.cpf));
    setClientes(clientesCadastrados);
  };

  useEffect(() => {
    listarVeiculosDisponiveis();
  }, []);

  return (
    <div>
      <h2>Cadastro de Veículo</h2>
      <input type="text" placeholder="Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} />
      <input type="text" placeholder="Valor/Hora" value={valorHora} onChange={(e) => setValorHora(e.target.value)} />
      <input type="text" placeholder="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} />
      <input type="text" placeholder="Ano" value={ano} onChange={(e) => setAno(e.target.value)} />
      <select value={categoria} onChange={(e) => setCategoria(e.target.value as Categoria)}>
        <option value={Categoria.Carro}>{Categoria.Carro}</option>
        <option value={Categoria.Moto}>{Categoria.Moto}</option>
      </select>
      <button onClick={handleCadastroVeiculo}>Cadastrar Veículo</button>

      <h2>Cadastro de Cliente</h2>
      <input type="text" placeholder="Nome" value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} />
      <input type="text" placeholder="CPF" value={cpfCliente} onChange={(e) => setCpfCliente(e.target.value)} />
      <select value={tipoCarteira} onChange={(e) => setTipoCarteira(e.target.value)}>
        <option value="A">A</option>
        <option value="B">B</option>
      </select>
    <button onClick={handleCadastroCliente}>Cadastrar Cliente</button>

    <div>
  <h3>Lista de Veículos Disponíveis</h3>
  <ul>
    {veiculosDisponiveis.map((veiculo, index) => (
      <li key={index}>
        Placa: {veiculo.placa}, Modelo: {veiculo.modelo}, Ano: {veiculo.ano}, Categoria: {veiculo.categoria}
      </li>
    ))}
  </ul>
</div>
      <div>
        <h3>Lista de Clientes Cadastrados</h3>
        <ul>
          {clientes.map((cliente, index) => (
            <li key={index}>
              Nome: {cliente.nome}, CPF: {cliente.cpf}, Tipo de Carteira: {cliente.tipoCarteira}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CadastroVeiculoComponent;
