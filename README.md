## JAMstack Metabooks Ecommerce

A partir de um fork do [jamstack-cms/jamstack-ecommerce](https://github.com/jamstack-cms/jamstack-ecommerce/tree/master), este projeto cria lojas com o GatsbyJS integrados a API da [Metabooks](https://metabooks.com/) e com a plataforma de Headless Commerce da [Dedalog](https://dedalog.com.br).

### Alguns exemplos gerados com a plataforma

- [Editora Zouk](https://dedalog-commerce-zouk.netlify.app/)
- [Buzz Editora](https://dedalog-commerce-buzz.netlify.app/)
- [Ubu Editora](https://dedalog-commerce-ubu.netlify.app/)

### Para configurar o gerador de websites do Gatsby, siga os seguintes passos:

1. Clone este projeto

```sh
$ git clone https://github.com/Dedalog/jamstack-ecommerce-metabooks.git
```

2. Instale todas as dependencias do projeto:

```sh
$ yarn

# ou

$ npm install
```

3. Este projeto usa variáveis de ambiente `.env.development` e `.env.production` para configurar as APIs de acesso. Crie estes arquivos com suas credenciais de acesso da Metabooks, o id da sua editora na Metabooks e a chave de API do Dedalog Commerce conforme o modelo abaixo:

```sh
# O endpoint oficial da METABOOKS
METABOOKS_ENDPOINT=https://www.metabooks.com/api/v2

# São três chaves de API da Metabooks necessárias: a de METADATA, a de COVER e a de MMO.
METABOOKS_API_KEYS_METADATA=
METABOOKS_API_KEYS_MMO=
METABOOKS_API_KEYS_COVER=

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

### Tailwind

O projeto usa o Tailwind como framework CSS. Para saber mais sobre o Tailwind clique [aqui](https://tailwindcss.com/docs).
