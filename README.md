## JAMstack MercadoEditorial.org Ecommerce

A partir de um fork do [jamstack-cms/jamstack-ecommerce](https://github.com/jamstack-cms/jamstack-ecommerce/tree/master), este projeto cria lojas com o GatsbyJS integrados a API da [Mercado Editorial](https://www.mercadoeditorial.org/) e com a plataforma de Headless Commerce da [Dedalog](https://dedalog.com.br).

#### Um exemplo gerados com a plataforma

- [Editora Veneta](https://dedalog-commerce-veneta.netlify.app/)

#### Para configurar o gerador de websites do Gatsby, siga os seguintes passos:

1. Clone este projeto

```sh
$ git clone --branch provider-mercadoeditorial --single-branch https://github.com/Dedalog/jamstack-ecommerce-metabooks.git
```

2. Instale todas as dependencias do projeto:

```sh
$ yarn

# ou

$ npm install
```

3. Este projeto usa variáveis de ambiente `.env.development` e `.env.production` para configurar as APIs de acesso. Crie estes arquivos com os ids dos selos da sua editora na MercadoEditoral.org e a chave de API do Dedalog Commerce conforme o modelo abaixo:

```sh
# O endpoint oficial da METABOOKS
MERCADOEDITORIAL_ENDPOINT=https://api.mercadoeditorial.org/api/v1.2

# Aqui vão os códigos da sua editora ou dos seus selos conforme cadastro da Metabooks. Por exemplo: BR0089671 é o selo Zahar da editora Companhia das Letras
PUBLISHER_IDS=["SELO1", "SELO2", "SELO3"]

# Chave de API do Dedalog Commerce. Se você ainda não possui acesso ao Dedalgo Commerce deixe em branco para testar
GATSBY_DEDALOG_COMMERCE_APIKEY=123456
```

4. Substituia o logo padrão na pasta `src/images/logo.png` pelo logo da sua editora

5. Rode o projeto para montar o site estático:

```sh
$ gatsby develop

# ou crie um build de produção para colocar o site no ar:

$ gatsby build
```

#### Tailwind

O projeto usa o Tailwind como framework CSS. Para saber mais sobre o Tailwind clique [aqui](https://tailwindcss.com/docs).

[![netlifybutton](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Dedalog/jamstack-ecommerce-metabooks)
