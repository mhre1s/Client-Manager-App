# Cliente Manager App

Este repositório contém o código-fonte de um aplicativo web desenvolvido para gerenciar clientes e registrar atendimentos técnicos realizados em suas residências. O objetivo principal é facilitar o trabalho de técnicos de campo, oferecendo uma plataforma para cadastro, edição e consulta de clientes.

## Visão Geral

O aplicativo possui duas telas principais:

1. **Tela de Login**:

   - Acesso restrito para técnicos.
   - O técnico entra com suas credenciais para acessar a aplicação.

2. **Tela de Gerenciamento de Clientes**:

   - Após o login, o técnico é redirecionado para uma lista de clientes cadastrados.
   - É possível:
     - Adicionar novos clientes.
     - Editar informações de clientes existentes.
     - Pesquisar clientes por nome, telefone ou endereço.
     - Registrar atendimentos realizados em cada residência, incluindo:
       - Texto descrevendo o que foi feito na residência.
       - Valor cobrado pela visita técnica.
     - Fazer logoff da aplicação.

## Funcionalidades

### Clientes

Cada cliente possui as seguintes informações:

- **Nome**
- **Telefone**
- **Rua**
- **Número**
- **Bairro**
- **Ponto de referência**
- **Complemento**
- **Provedor de internet**
- **Registros de Atendimento**:
  - Área de texto para descrever o serviço realizado.
  - Campo para informar o valor cobrado pela visita.

### Recursos Adicionais

- **Pesquisa**: Permite filtrar clientes por nome, telefone ou endereço.
- **Edição**: Possibilidade de atualizar dados dos clientes.
- **Navegação**: Paginação para facilitar a visualização de grandes listas de clientes.
- **Logoff**: Opção para sair do sistema de forma segura.

## Tecnologias Utilizadas

Este projeto contém **somente o frontend**, desenvolvido utilizando:

- **React**
- **Tailwind CSS**
- **Ícones**: React-icons
- **Ferramentas de Desenvolvimento**:
  - Vite para gerenciamento de projetos React.

O backend e a API REST para gerenciamento dos dados de clientes **não estão incluídos neste repositório**.

## Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado
- Gerenciador de pacotes (npm ou yarn)

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Navegue até a pasta do projeto:
   ```bash
   cd seu-repositorio
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Acesse o aplicativo no navegador em [http://localhost:5173](http://localhost:5173).

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests para melhorias e correções.

## Licença

Este projeto está licenciado sob a MIT License. Consulte o arquivo LICENSE para mais detalhes.

---

Desenvolvido com ❤️ por [Matheus Reis].



