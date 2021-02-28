# Meus Produtos - Frontend WEB

Autor: Wallisson Rony de M. N.

Este é um repositório que apresenta um CRUD simples para manipulação de produtos. Este projeto tem alguns projetos relacionados, como o repositório com o projeto <a href="https://github.com/wallrony/products-backend">Backend</a> e o repositório com o projeto <a href="https://github.com/wallrony/products-mobile" target="_blank">Mobile</a>.

O projeto tem como principal objetivo apresentar o CRUD de produtos, entidade essa que a seguinte estrutura:

```json
{
  "name": "Nome do produto",
  "price": "Preço do produto",
  "image_path": "Link da imagem do produto (facultativo)"
}
```

### Features Implementadas

- Sistema de roteamento e esqueleto das páginas (fica adaptável para futuras implementações mais elaboradas/com mais rotas);
- Listagem de produtos;
- Adição de um produto (nome, preço e imagem);
- Alteração de um produto (nome, preço e imagem);
- Exclusão de um produto por id;
- Responsividade;
- Componentização;
- Organização de camadas da aplicação:
- 1. View;
- 2. Context/Provider;
- 3. Service;
- 4. Facade;
- 5. API Class (para enviar requisição para o backend).
- Estilização.

### Features Pendentes

- Dark mode;

## Como Executar?

- Dê um git clone do repositório para obtê-lo por completo;
- Entre na pasta do projeto;
- Execute `yarn` ou `npm install` para instalar todas as dependências do projeto;
- Crie o arquivo .env e preencha a variável "REACT_APP_API_URL", seguindo o modelo apresentado no arquivo .env.example;
- Inicie o backend (caso não tenha baixado, é só baixar o repositório do backend pelo link disponibilizado lá em cima e seguir o README.md para instalar/configurar e inicializar);
- Em caso de erro com a comunicação com o backend e você esteja utilizando "localhost" na variável "REACT_APP_API_URL", tente alterá-la para o seu IP;
- Execute `yarn start` ou `npm run start` para iniciar a aplicação.

E é isso, você está executando a aplicação frontend do projeto de produtos!

Qualquer dúvida, crie uma issue que te responderei assim que possível!
