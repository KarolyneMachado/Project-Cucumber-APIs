Feature: Buscar de usuarios

  Scenario: 01 - Buscar todos usuarios
    Given que o sistema precise listar todos usuarios
    When enviar requisicao no endpoint
    Then esperado response code is 200 sucess com lista de usuarios.

  Scenario: 02 - Busca usuario invalido
    Given que o sistema precise busca usuario invalido
    When enviar requisicao com idUserInvalido
    Then esperado response code is 400

  Scenario: 03 - Criar usuario novo
    Given que o sistema queira cadastrar usuario novo
    When enviar requisicao com payloand valido
    Then esperado response code is 201 e realize criar com sucesso.

   Scenario: 04 - Busca usuario criado
    Given que o sistema precise lista um usuario
    When enviar requisicao com idUser
    Then esperado response code is 200 sucess com id informado.  

  Scenario: 05 - Criar usuario dados invalido
    Given que o sistema queira cadastrar usuario invalido
    When enviar requisicao com payloand invalido
    Then esperado response code is 400 e nao realize cadastro.

  Scenario: 06 - Atualizar cadastro
    Given que o sistema precise atualizar usuario
    When enviar requisicao com alteracao de senha
    Then esperado response code is 200 e realize alteracao.

  Scenario: 07 - Remover usuario
    Given que o sistema precise remover usuario
    When enviar requisicao delete com idUser
    Then esperado response code is 200 e remova usuario.
