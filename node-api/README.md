# api-template

# Desenvolvimento - fase 01
Configurados os ambientes;
Implementado o model users;
Implementado o login com token JWT;
Pronto para iniciar o desenvolvimento da aplicação;

# Desenvolvimento - fase 02
17/09/2019 - Atualização sobre a API
Estão funcionando os endpoints: Tasks, Intimations, Processos e Clientes.
Contudo, ainda não foi feito o vínculo entre as páginas.

Iniciei o processo de vinculação Clientes X Processos, criando o endpoint 
'processos/join' que a princípio está fazendo um Join pelo Nome do Cliente,
e não pelo ID.
Atenção:
   1. Na 'processos/join' somente retorna os processos que tem um cliente vinculado;
   2. Será necessário fazer alguma regra ao criar processo:
      2.1. Pesquisar se o ID já está cadastrado na página pessoas;
      2.2. Caso não, pesquisar se o nome está cadastrado na página Pessoas;
      2.3. Caso não, gerar um cadastro de Pessoa com o nome fornecido, e substituir
      o 'req.body.nome' pelo ID da pessoa criada, em seguida gravar o registro Processo;
   3. Ao finalizar de configurar, editar o model e controller para direcionar ao clientes._id

