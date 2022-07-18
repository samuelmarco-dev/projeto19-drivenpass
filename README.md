<p align="center">
  <a href="https://github.com/$username-github/$nome-repositorio">
    <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f512.svg" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    DrivenPass
  </h3>
</p>

## Description
DrivenPass: API de Gerenciador de Senhas para Credenciais, Notas, Cartões e Senhas Wi-fi, utilizando criptografia e autenticação.

## Usage
```bash
$ git clone https://github.com/samuelmarco-dev/projeto19-drivenpass.git

$ cd projeto19-drivenpass

$ npm install

$ npm start
```

## API DrivenPass
```bash
User:
    - POST /sign-up: Cadastra um novo usuário.
    - POST /sign-in: Autentica um usuário.
    - PUT /logout: Desautentica um usuário.

Credential (Autenticada por Token):
    - POST /credential: Cadastra uma nova credencial.
    - GET /credentials: Lista todas as credenciais do usuário.
    - GET /credential/:id: Lista uma credencial específica do usuário.
    - DELETE /credential/:id: Deleta uma credencial específica do usuário.

Note (Autenticada por Token):
    - POST /note: Cadastra uma nova nota.
    - GET /notes: Lista todas as notas do usuário.
    - GET /note/:id: Lista uma nota específica do usuário.
    - DELETE /note/:id: Deleta uma nota específica do usuário.

Wifi (Autenticada por Token):
    - POST /wifi: Cadastra uma nova senha Wi-fi.
    - GET /wifis: Lista todas as senhas Wi-fi do usuário.
    - GET /wifi/:id: Lista uma senha Wi-fi específica do usuário.
    - DELETE /wifi/:id: Deleta uma senha Wi-fi específica do usuário.

Card (Autenticada por Token):
    - POST /card: Cadastra um novo cartão.
    - GET /cards: Lista todos os cartões do usuário.
    - GET /card/:id: Lista um cartão específico do usuário.
    - DELETE /card/:id: Deleta um cartão específico do usuário.
```

## Manual Tests Thunder Client
```bash
    $ cd tests
    $ ls

    thunder-collection_DrivenPass.json
    (import file to Thunder Client extension as collection)
```
